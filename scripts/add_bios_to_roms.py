#!/usr/bin/env python3
"""
Script to add Neo Geo BIOS files to ROM zip files.
Adds the 4 BIOS files from the temp directory to each ROM zip in the specified directory.
"""

import os
import zipfile
from pathlib import Path
import shutil

# Paths
TEMP_DIR = Path(__file__).parent / "temp"
ROMS_DIR = Path("/Users/taile/Downloads/neogeoaesmvscomplete/Neo Geo AES - MVS/Final Burn Neo romset")

# BIOS files to add
BIOS_FILES = [
    "000-lo.lo",
    "sfix.sfix",
    "sm1.sm1",
    "sp-s3.sp1"
]

def add_bios_to_rom(rom_path, bios_files_dict):
    """
    Add BIOS files to a ROM zip if they don't already exist.
    
    Args:
        rom_path: Path to the ROM zip file
        bios_files_dict: Dictionary mapping filename to file path
    """
    try:
        # Create a temporary file
        temp_zip = rom_path.parent / f"{rom_path.stem}_temp.zip"
        
        # Read existing zip and write to new zip
        with zipfile.ZipFile(rom_path, 'r') as existing_zip:
            with zipfile.ZipFile(temp_zip, 'w', zipfile.ZIP_DEFLATED) as new_zip:
                # Copy existing files
                existing_files = existing_zip.namelist()
                for item in existing_files:
                    data = existing_zip.read(item)
                    new_zip.writestr(item, data)
                
                # Add BIOS files if they don't exist
                files_added = []
                for filename, filepath in bios_files_dict.items():
                    if filename not in existing_files:
                        new_zip.write(filepath, filename)
                        files_added.append(filename)
                
                if files_added:
                    print(f"  ✓ Added {len(files_added)} BIOS file(s): {', '.join(files_added)}")
                else:
                    print(f"  ⚠ All BIOS files already exist")
        
        # Replace original with updated zip
        shutil.move(temp_zip, rom_path)
        return True
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        # Clean up temp file if it exists
        if temp_zip.exists():
            temp_zip.unlink()
        return False

def main():
    print("Neo Geo ROM BIOS Injector")
    print("=" * 60)
    
    # Check if temp directory exists
    if not TEMP_DIR.exists():
        print(f"Error: temp directory not found at {TEMP_DIR}")
        return
    
    # Check if ROMs directory exists
    if not ROMS_DIR.exists():
        print(f"Error: ROMs directory not found at {ROMS_DIR}")
        return
    
    # Prepare BIOS files dictionary
    bios_files_dict = {}
    missing_files = []
    
    for filename in BIOS_FILES:
        filepath = TEMP_DIR / filename
        if filepath.exists():
            bios_files_dict[filename] = filepath
        else:
            missing_files.append(filename)
    
    if missing_files:
        print(f"Warning: Missing BIOS files: {', '.join(missing_files)}")
        print(f"Available BIOS files: {', '.join(bios_files_dict.keys())}")
        if not bios_files_dict:
            print("Error: No BIOS files found. Exiting.")
            return
    
    print(f"\nSource directory: {TEMP_DIR}")
    print(f"ROMs directory: {ROMS_DIR}")
    print(f"BIOS files to add: {', '.join(bios_files_dict.keys())}")
    print()
    
    # Find all zip files in ROMs directory
    rom_files = list(ROMS_DIR.glob("*.zip"))
    
    if not rom_files:
        print(f"No zip files found in {ROMS_DIR}")
        return
    
    print(f"Found {len(rom_files)} ROM file(s)\n")
    
    # Process each ROM
    success_count = 0
    fail_count = 0
    
    for i, rom_path in enumerate(rom_files, 1):
        print(f"[{i}/{len(rom_files)}] Processing: {rom_path.name}")
        
        if add_bios_to_rom(rom_path, bios_files_dict):
            success_count += 1
        else:
            fail_count += 1
    
    # Summary
    print()
    print("=" * 60)
    print(f"Summary:")
    print(f"  Total ROMs processed: {len(rom_files)}")
    print(f"  Successful: {success_count}")
    print(f"  Failed: {fail_count}")
    print("=" * 60)

if __name__ == "__main__":
    main()
