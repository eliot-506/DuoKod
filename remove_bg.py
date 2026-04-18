import os
from rembg import remove
from PIL import Image

src_dir = r"C:\Users\mmatc\.gemini\antigravity\brain\eb56f5df-2fe5-4af0-be92-7fdd1fe87a90"
dest_dir = r"C:\Users\mmatc\OneDrive\Desktop\DuoKod\public\assets\mascots"

images = {
    "idle": "ai_mascot_idle_1774678365679.png",
    "invite": "ai_mascot_invite_1774678381650.png",
    "happy": "ai_mascot_happy_1774678396500.png",
    "sad": "ai_mascot_sad_1774678409018.png"
}

os.makedirs(dest_dir, exist_ok=True)

for state, filename in images.items():
    input_path = os.path.join(src_dir, filename)
    output_path = os.path.join(dest_dir, f"{state}.png")
    
    print(f"Processing {state}...")
    try:
        input_image = Image.open(input_path)
        output_image = remove(input_image)
        output_image.save(output_path)
        print(f"Saved: {output_path}")
    except Exception as e:
        print(f"Error processing {state}: {e}")

print("Done!")
