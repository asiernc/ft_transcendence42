from rest_framework import serializers
import filetype

def validate_image(image_file):
    print("Starting image validation...")
    image_file.seek(0)
    first_bytes = image_file.read(10)
    print(f"First bytes (hex): {first_bytes.hex()}")

    kind = filetype.guess(image_file)
    print(f"Detected MIME type: {kind.mime if kind else 'Unknown'}")

    if not kind or kind.extension not in ["jpg", "jpeg", "png", "gif"]:
        raise serializers.ValidationError("Unsupported image type")

    magic_numbers = {
        "jpg": [b"\xFF\xD8\xFF"],
        "jpeg": [b"\xFF\xD8\xFF"],
        "png": [b"\x89\x50\x4E\x47\x0D\x0A\x1A\x0A"],
        "gif": [b"GIF89a", b"GIF87a"]
    }

    valid_signature = any(first_bytes.startswith(sig) for sig in magic_numbers.get(kind.extension, []))
    if not valid_signature:
        raise serializers.ValidationError("File extension does not match its content")

    image_file.seek(0)
    first_500_bytes = image_file.read(500)
    if b'<script>' in first_500_bytes or b'<?php' in first_500_bytes:
        raise serializers.ValidationError("Invalid image file (possible malicious content)")

    image_file.seek(0)
    if image_file.size > 2*1024*1024:
        raise serializers.ValidationError("Image file too large ( > 2MB )")

    print("Image validation successful")
    return True
