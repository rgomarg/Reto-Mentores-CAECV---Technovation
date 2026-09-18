package com.retoCAECV.backend.service;

public interface EstadisticasService {
    // Genera un texto con las métricas actuales de descubrimiento de productos
    String generarReporteSemanalAgricultor();
    
    // Envía el reporte por correo a una dirección concreta
    void enviarReporteEmail(String emailDestino);
}
