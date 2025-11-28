import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware pour calculer les stats dynamiquement
server.get('/stats', (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
  
  // Compter les projets
  const totalProjects = db.projects ? db.projects.length : 0;
  
  // Compter les certifications
  const totalCertifications = db.certifications ? db.certifications.length : 0;
  
  // Compter les formations
  const totalEducation = db.education ? db.education.length : 0;
  
  // Compter les messages
  const totalMessages = db.messages ? db.messages.length : 0;
  
  // Calculer les technologies utilisées
  const techMap = {};
  if (db.projects) {
    db.projects.forEach(project => {
      if (project.technologies && Array.isArray(project.technologies)) {
        project.technologies.forEach(tech => {
          techMap[tech] = (techMap[tech] || 0) + 1;
        });
      }
    });
  }
  
  const technologies = Object.entries(techMap).map(([name, count]) => ({
    name,
    count
  })).sort((a, b) => b.count - a.count);
  
  res.json({
    totalProjects,
    totalCertifications,
    totalEducation,
    totalMessages,
    technologies
  });
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on http://localhost:3001');
});
