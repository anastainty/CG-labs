import tkinter as tk
from tkinter import filedialog, messagebox
import cv2
from PIL import Image, ImageTk

class ImageProcessorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Image Processing App")
        self.root.geometry("800x600")
        self.file_path = None
        self.original_image = None
        self.create_widgets()

    def create_widgets(self):
        button_frame = tk.Frame(self.root, pady=10)
        button_frame.pack(side=tk.TOP, fill=tk.X)

        self.load_button = tk.Button(button_frame, text="Load Image", command=self.load_image, bg="lightblue", font=("Arial", 12, "bold"))
        self.load_button.pack(side=tk.LEFT, padx=5)

        self.process_button = tk.Button(button_frame, text="High-Frequency Filter", command=self.apply_high_frequency_filter, bg="lightgreen", font=("Arial", 12, "bold"))
        self.process_button.pack(side=tk.LEFT, padx=5)

        self.threshold_button1 = tk.Button(button_frame, text="Otsu's Threshold", command=self.apply_threshold1, bg="lightcoral", font=("Arial", 12, "bold"))
        self.threshold_button1.pack(side=tk.LEFT, padx=5)

        self.threshold_button2 = tk.Button(button_frame, text="Simple Threshold", command=self.apply_threshold2, bg="lightpink", font=("Arial", 12, "bold"))
        self.threshold_button2.pack(side=tk.LEFT, padx=5)

        self.compress_button = tk.Button(button_frame, text="Compress Image", command=self.compress_image, bg="lightyellow", font=("Arial", 12, "bold"))
        self.compress_button.pack(side=tk.LEFT, padx=5)

        self.image_label = tk.Label(self.root)
        self.image_label.pack(fill=tk.BOTH, expand=True)

    def load_image(self):
        self.file_path = filedialog.askopenfilename()
        if self.file_path:
            self.original_image = cv2.imread(self.file_path, cv2.IMREAD_GRAYSCALE)
            self.display_image(self.original_image)

    def display_image(self, image):
        image = Image.fromarray(image)
        image = ImageTk.PhotoImage(image)
        self.image_label.config(image=image)
        self.image_label.image = image

    def apply_high_frequency_filter(self):
        if self.original_image is None:
            messagebox.showerror("Error", "No image loaded")
            return
        gaussian = cv2.GaussianBlur(self.original_image, (9, 9), 10.0)
        unsharp_image = cv2.addWeighted(self.original_image, 1.5, gaussian, -0.5, 0)
        self.display_image(unsharp_image)

    def apply_threshold1(self):
        if self.original_image is None:
            messagebox.showerror("Error", "No image loaded")
            return
        _, processed_image = cv2.threshold(self.original_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        self.display_image(processed_image)

    def apply_threshold2(self):
        if self.original_image is None:
            messagebox.showerror("Error", "No image loaded")
            return
        _, processed_image = cv2.threshold(self.original_image, 127, 255, cv2.THRESH_BINARY)
        self.display_image(processed_image)

    def compress_image(self):
        if self.original_image is None:
            messagebox.showerror("Error", "No image loaded")
            return
        file_path = filedialog.asksaveasfilename(defaultextension=".jpg", filetypes=[("JPEG files", "*.jpg"), ("All files", "*.*")])
        if file_path:
            compressed_image = cv2.imread(self.file_path)
            cv2.imwrite(file_path, compressed_image, [int(cv2.IMWRITE_JPEG_QUALITY), 50])
            messagebox.showinfo("Success", "Image compressed and saved")

if __name__ == "__main__":
    root = tk.Tk()
    app = ImageProcessorApp(root)
    root.mainloop()
