from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import os

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# CLOUDINARY CONFIG
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_image():
    try:
        file = request.files["image"]
        upload = cloudinary.uploader.upload(file)

        return jsonify({
            "success": True,
            "url": upload["secure_url"]
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/generate", methods=["POST"])
def generate_image():
    try:
        prompt = request.json.get("prompt", "")

        # Always-returning-working sample image
        ai_image_url = "htt
