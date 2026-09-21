package com.retoCAECV.backend.service.impl;

import com.retoCAECV.backend.entity.UsuarioCromo;
import com.retoCAECV.backend.repository.UsuarioCromoRepository;
import com.retoCAECV.backend.service.EstadisticasService;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.time.DayOfWeek;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EstadisticasServiceImpl implements EstadisticasService {

    private final UsuarioCromoRepository usuarioCromoRepository;
    private final JavaMailSender mailSender;

    public EstadisticasServiceImpl(UsuarioCromoRepository usuarioCromoRepository, JavaMailSender mailSender) {
        this.usuarioCromoRepository = usuarioCromoRepository;
        this.mailSender = mailSender;
    }

    @Override
    public void enviarReporteEmail(String emailDestino) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");
            
            helper.setFrom("orivaretocaecv@gmail.com", "ORIVA Analytics");
            helper.setTo(emailDestino);
            helper.setSubject("Tu Reporte de Impacto Semanal - ORIVA");
            
            // Generar el contenido dinámico
            String contenidoHtml = generarReporteSemanalAgricultor();
            
            helper.setText(contenidoHtml, true); // true indica que es HTML
            helper.addInline("orivaLogo", new org.springframework.core.io.ClassPathResource("ORIVA_logo.png"));
            
            mailSender.send(mensaje);
            System.out.println("Reporte enviado con éxito a: " + emailDestino);
        } catch (MessagingException | java.io.UnsupportedEncodingException e) {
            throw new RuntimeException("Error al enviar el correo a " + emailDestino, e);
        }
    }

    @Override
    public String generarReporteSemanalAgricultor() {
        List<UsuarioCromo> todosLosEscaneos = usuarioCromoRepository.findAll();

        if (todosLosEscaneos.isEmpty()) {
            return "Todavía no hay datos suficientes esta semana. ¡Sigue dando a conocer tus productos!";
        }

        LocalDateTime hace7Dias = LocalDateTime.now().minusDays(7);
        LocalDateTime hace14Dias = LocalDateTime.now().minusDays(14);

        // Filtrar escaneos de esta semana y la semana pasada
        List<UsuarioCromo> escaneosEstaSemana = todosLosEscaneos.stream()
                .filter(uc -> uc.getFechaObtenido() != null && uc.getFechaObtenido().isAfter(hace7Dias))
                .collect(Collectors.toList());

        List<UsuarioCromo> escaneosSemanaPasada = todosLosEscaneos.stream()
                .filter(uc -> uc.getFechaObtenido() != null && uc.getFechaObtenido().isAfter(hace14Dias) && uc.getFechaObtenido().isBefore(hace7Dias))
                .collect(Collectors.toList());

        int totalFamiliasEstaSemana = escaneosEstaSemana.size();
        int totalFamiliasSemanaPasada = escaneosSemanaPasada.size();
        
        // Calcular datos día a día para la gráfica (de Lunes a Domingo)
        long[] datosPorDia = new long[7];
        for (UsuarioCromo uc : escaneosEstaSemana) {
            if (uc.getFechaObtenido() != null) {
                int diaIndex = uc.getFechaObtenido().getDayOfWeek().getValue() - 1; // Lunes=0, Domingo=6
                datosPorDia[diaIndex]++;
            }
        }

        // Encontrar el día pico
        String[] nombresDias = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"};
        String diaPico = "esta semana";
        long maxEscaneos = 0;
        for (int i = 0; i < 7; i++) {
            if (datosPorDia[i] > maxEscaneos) {
                maxEscaneos = datosPorDia[i];
                diaPico = nombresDias[i];
            }
        }

        // Encontrar el producto estrella
        Map<String, Long> escaneosPorProducto = escaneosEstaSemana.stream()
            .filter(uc -> uc.getCromo() != null)
            .collect(Collectors.groupingBy(
                uc -> uc.getCromo().getNombre(),
                Collectors.counting()
            ));

        String productoEstrella = "Tus productos";
        long maxProducto = 0;
        for (Map.Entry<String, Long> entry : escaneosPorProducto.entrySet()) {
            if (entry.getValue() > maxProducto) {
                maxProducto = entry.getValue();
                productoEstrella = entry.getKey();
            }
        }

        // Calcular porcentaje real
        long porcentaje = 0;
        String tendencia = "igual";
        if (totalFamiliasSemanaPasada > 0) {
            porcentaje = Math.round(((double) (totalFamiliasEstaSemana - totalFamiliasSemanaPasada) / totalFamiliasSemanaPasada) * 100);
            tendencia = porcentaje >= 0 ? "un aumento" : "un descenso";
        } else if (totalFamiliasEstaSemana > 0) {
            porcentaje = 100;
            tendencia = "un aumento";
        }

        // Generar URL de la gráfica con QuickChart
        String chartData = "[" + datosPorDia[0] + "," + datosPorDia[1] + "," + datosPorDia[2] + "," + datosPorDia[3] + "," + datosPorDia[4] + "," + datosPorDia[5] + "," + datosPorDia[6] + "]";
        String chartConfig = "{type:'bar',data:{labels:['L','M','X','J','V','S','D'],datasets:[{label:'Familias descubriendo tus productos',backgroundColor:'rgb(193,198,154)',data:" + chartData + "}]}}";
        String chartUrl = "";
        try {
            chartUrl = "https://quickchart.io/chart?c=" + java.net.URLEncoder.encode(chartConfig, "UTF-8");
        } catch (java.io.UnsupportedEncodingException e) {
            chartUrl = "https://quickchart.io/chart?c=" + chartConfig;
        }

        // Construir el reporte en HTML
        StringBuilder reporte = new StringBuilder();
        reporte.append("<div style='font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>");
        reporte.append("<h2 style='color: #2B5C65; text-align: center;'>Reporte de Impacto ORIVA</h2>");
        reporte.append("<p style='color: #555;'>¡Hola! Aquí tienes el resumen de cómo han funcionado tus productos ecológicos esta semana:</p>");
        
        reporte.append("<div style='background-color: #FCF6DF; padding: 15px; border-radius: 8px; margin-bottom: 20px;'>");
        reporte.append("<h3 style='margin-top:0; color: #2B5C65;'>Resumen Semanal</h3>");
        reporte.append("<ul style='color: #333; line-height: 1.6;'>");
        reporte.append("<li><b>").append(totalFamiliasEstaSemana).append(" Usuarios</b> han interactuado con tus productos en los últimos 7 días.</li>");
        
        if (porcentaje != 0) {
            reporte.append("<li>Esto supone <b>").append(tendencia).append(" del ").append(Math.abs(porcentaje)).append("%</b> respecto a la semana pasada.</li>");
        } else {
            reporte.append("<li>El volumen de demanda se ha mantenido constante respecto a la semana pasada.</li>");
        }

        if (maxEscaneos > 0) {
            reporte.append("<li>El día con mayor afluencia fue el <b>").append(diaPico).append("</b>.</li>");
        }
        if (maxProducto > 0) {
            reporte.append("<li>Tu producto estrella ha sido: <b>").append(productoEstrella).append("</b>.</li>");
        }
        reporte.append("</ul></div>");

        reporte.append("<h3 style='color: #2B5C65; text-align: center;'>Actividad diaria</h3>");
        reporte.append("<div style='text-align: center;'><img src='").append(chartUrl).append("' alt='Gráfica de actividad' style='max-width: 100%; border-radius: 8px;'/></div>");

        reporte.append("<p style='text-align: center; color: #777; margin-top: 30px; font-size: 0.9em;'><i>Gracias por cultivar un futuro sostenible.<br/>El equipo de ORIVA.</i></p>");
        reporte.append("<div style='text-align: center; margin-top: 15px;'><img src='cid:orivaLogo' alt='Logo ORIVA' style='max-width: 150px;' /></div>");
        reporte.append("</div>");

        return reporte.toString();
    }
}
