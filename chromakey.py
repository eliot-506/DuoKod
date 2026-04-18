from PIL import Image
import os

src_dir = r"C:\Users\mmatc\.gemini\antigravity\brain\eb56f5df-2fe5-4af0-be92-7fdd1fe87a90"
dest_dir = r"C:\Users\mmatc\OneDrive\Desktop\DuoKod\public\assets\mascots"

images = {
    "idle": "ai_mascot_idle_1774678365679.png",
    "invite": "ai_mascot_invite_1774678381650.png",
    "happy": "ai_mascot_happy_1774678396500.png",
    "sad": "ai_mascot_sad_1774678409018.png"
}

os.makedirs(dest_dir, exist_ok=True)
THRESHOLD = 80 # Tolerance for green spill
DARK_TOLERANCE = 50

for state, filename in images.items():
    input_path = os.path.join(src_dir, filename)
    output_path = os.path.join(dest_dir, f"{state}.png")
    
    print(f"Processing {state}...")
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # We asked for bright green: #00FF00 -> R=0, G=255, B=0
            # Condition: High Green, Low Red, Low Blue
            if item[1] > 100 and item[0] < THRESHOLD and item[2] < THRESHOLD:
                newData.append((255, 255, 255, 0)) # Fully transparent
            # Some dark edges might bleed green
            elif item[1] > item[0] + 20 and item[1] > item[2] + 20 and item[1] < 100:
                newData.append((255, 255, 255, 0)) # Antialiased borders of background
            else:
                newData.append(item)
                
        img.putdata(newData)
        
        # Second pass to smooth borders slightly
        from PIL import ImageFilter
        # Actually doing standard color to alpha is rough. 
        # But let's first save what we have.
        img.save(output_path, "PNG")
        print(f"Saved: {output_path}")
    except Exception as e:
        print(f"Error processing {state}: {e}")

print("Done!")
