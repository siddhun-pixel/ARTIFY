from flask import Flask, request, jsonify
from flask_cors import CORS
import cloudinary
import cloudinary.uploader
import os

app = Flask(__name__)
CORS(app)

# -------------------------
# CLOUDINARY CONFIGURATION
# -------------------------
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

@app.route("/", methods=["GET"])
def home():
    return {"message": "ARTIFY Backend Running Successfully!"}

# ------------------------------------
# UPLOAD IMAGE TO CLOUDINARY ENDPOINT
# ------------------------------------
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


# ----------------------------------------------------
# EXAMPLE TEXT-TO-IMAGE (DUMMY AI MODEL IMPLEMENTATION)
# ----------------------------------------------------
@app.route("/generate", methods=["POST"])
def generate_image():
    try:
        prompt = request.json["prompt"]

        # Dummy AI Image URL (replace with your AI model)
        ai_image_url = "https://placehold.co/600x400?text=Generated+Image"

        return jsonify({
            "success": True,
            "prompt": prompt,
            "url": ai_image_url
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

