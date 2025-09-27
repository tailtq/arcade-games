from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
from pathlib import Path

# Create FastAPI app
app = FastAPI(title="FE Games Emulator Server")

# Get the directory where this script is located
BASE_DIR = Path(__file__).parent

# Mount static file directories
app.mount("/data", StaticFiles(directory=BASE_DIR / "data"), name="data")
app.mount("/roms", StaticFiles(directory=BASE_DIR / "roms"), name="roms")
app.mount("/assets", StaticFiles(directory=BASE_DIR / "assets"), name="assets")
# app.mount("/", StaticFiles(directory=BASE_DIR), name="roms")

@app.get("/{path:path}", response_class=HTMLResponse)
async def read_root(path: str):
    """Serve the main index.html file"""
    html_file = BASE_DIR / "index.html"
    if html_file.exists():
        with open(html_file, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    else:
        return HTMLResponse(content="<h1>Error: index.html not found</h1>", status_code=404)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "FE Games server is running"}

if __name__ == "__main__":
    print("Starting FE Games Emulator Server...")
    print(f"Server will be available at: http://localhost:8000")
    print(f"Serving files from: {BASE_DIR}")
    
    # Check if required directories exist
    data_dir = BASE_DIR / "data"
    roms_dir = BASE_DIR / "roms"
    index_file = BASE_DIR / "index.html"
    
    if not data_dir.exists():
        print(f"Warning: {data_dir} directory not found!")
    if not roms_dir.exists():
        print(f"Warning: {roms_dir} directory not found!")
    if not index_file.exists():
        print(f"Warning: {index_file} file not found!")
    
    # Run the server
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )
