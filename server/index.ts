import express, { Request, Response } from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3001;

// Interfaces
interface Ticket {
  id?: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'closed';
  created_at?: string;
}

// Middleware
app.use(cors());
app.use(express.json());

// Banco de Dados
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Inicialização das tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Rotas
app.get('/api/stats', (req: Request, res: Response) => {
  const total = db.prepare('SELECT count(*) as count FROM tickets').get() as any;
  const open = db.prepare("SELECT count(*) as count FROM tickets WHERE status = 'open'").get() as any;
  const inProgress = db.prepare("SELECT count(*) as count FROM tickets WHERE status = 'in_progress'").get() as any;
  const closed = db.prepare("SELECT count(*) as count FROM tickets WHERE status = 'closed'").get() as any;
  
  res.json({
    total: total.count,
    open: open.count,
    inProgress: inProgress.count,
    closed: closed.count
  });
});

app.get('/api/tickets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ error: 'Ticket não encontrado' });
  }
});

app.get('/api/tickets', (req: Request, res: Response) => {
  const tickets = db.prepare('SELECT * FROM tickets ORDER BY created_at DESC').all();
  res.json(tickets);
});

app.post('/api/tickets', (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  const info = db.prepare('INSERT INTO tickets (title, description, priority) VALUES (?, ?, ?)')
    .run(title, description, priority || 'medium');
  
  res.json({ 
    id: info.lastInsertRowid, 
    title, 
    description, 
    priority, 
    status: 'open' 
  });
});

app.patch('/api/tickets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, priority } = req.body;
  
  if (status) {
    db.prepare('UPDATE tickets SET status = ? WHERE id = ?').run(status, id);
  }
  if (priority) {
    db.prepare('UPDATE tickets SET priority = ? WHERE id = ?').run(priority, id);
  }
  
  res.json({ success: true });
});

app.delete('/api/tickets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM tickets WHERE id = ?').run(id);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`[server]: Servidor TypeScript rodando em http://localhost:${port}`);
});
