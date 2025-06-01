package com.tfc.rallyshop.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dlvjdzl4q",
                "api_key", "914897456938955",
                "api_secret", "20dd1hcX906GlnfPpv2NPlyy6rI"
        ));
    }

    public String subirImagen(MultipartFile archivo) throws IOException {
        Map resultado = cloudinary.uploader().upload(archivo.getBytes(), ObjectUtils.emptyMap());
        return (String) resultado.get("secure_url");
    }

    public Map borrarImagen(String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
