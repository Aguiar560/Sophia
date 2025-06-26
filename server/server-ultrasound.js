// Rotas para vídeos de ultrasom
app.get('/api/ultrasounds', async (req, res) => {
  try {
    const ultrasounds = await db.getAllUltrasounds();
    res.json(ultrasounds.map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      filePath: `/uploads/${path.basename(item.file_path)}`,
      createdAt: item.created_at
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ultrasounds', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    
    const { title, date } = req.body;
    
    if (!title || !date) {
      return res.status(400).json({ error: 'Título e data são obrigatórios' });
    }
    
    const filePath = req.file.path;
    const id = await db.addUltrasound(title, date, filePath);
    
    res.status(201).json({ 
      id, 
      title, 
      date, 
      filePath: `/uploads/${path.basename(filePath)}`,
      message: 'Vídeo enviado com sucesso!' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/ultrasounds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Buscar o caminho do arquivo antes de excluir
    const [ultrasound] = await pool.query('SELECT file_path FROM Ultrasound WHERE id = ?', [id]);
    
    if (ultrasound.length === 0) {
      return res.status(404).json({ error: 'Vídeo não encontrado' });
    }
    
    const filePath = ultrasound[0].file_path;
    
    // Excluir do banco de dados
    const deleted = await db.deleteUltrasound(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Vídeo não encontrado' });
    }
    
    // Excluir o arquivo
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.json({ message: 'Vídeo excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});