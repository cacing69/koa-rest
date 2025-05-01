import app from './app';

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Visit http://localhost:${PORT}/docs for Swagger UI`);
});
