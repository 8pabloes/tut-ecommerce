import React from "react";
import "./Acerca.css";

function Acerca() {
  return (
    <div className="acerca-container container pt-5 mt-5 mb-5">
      <h2 className="fw-bold mb-4 text-center">🏁 Sobre TUT-RallyShop</h2>

      <p className="lead">
        <strong>TUT-RallyShop</strong> es una tienda online especializada en vehículos de rally de alto rendimiento,
        dirigida a entusiastas del motor que buscan calidad, exclusividad y experiencia de compra personalizada.
        Nacida de la pasión por la velocidad y la competición, nuestra plataforma combina tecnología y diseño
        para ofrecer una experiencia de usuario moderna y eficiente.
      </p>

      <p>
        Nuestro catálogo incluye modelos cuidadosamente seleccionados, tanto clásicos como contemporáneos,
        con información detallada, imágenes reales y actualizadas, y un sistema de stock en tiempo real.
        Cada coche que aparece en la web ha sido verificado para garantizar su autenticidad y prestaciones.
      </p>

      <p>
        En <strong>TUT-RallyShop</strong> apostamos por una experiencia digital de calidad: pago seguro con Stripe,
        registro rápido, sistema de favoritos personalizado, cesta persistente y envío automático de
        confirmaciones por email. Además, contamos con un panel de administración donde se gestionan los coches
        en venta directamente desde la web.
      </p>

      <div className="info-seccion mt-5">
        <h4 className="fw-semibold mb-3">📍 ¿Dónde estamos?</h4>
        <p>
          Nuestra sede se encuentra en A Coruña, Galicia, pero operamos 100% online y hacemos envíos a toda España.
          Nuestro equipo está formado por profesionales del sector web y aficionados al automovilismo.
        </p>
      </div>

      <div className="contacto-box mt-4 p-4 rounded shadow-sm">
        <h4 className="fw-semibold mb-3">📬 Contacto directo</h4>
        <ul className="list-unstyled mb-0">
          <li><strong>Email:</strong> contacto@tut-rallyshop.com</li>
          <li><strong>Teléfono:</strong> +34 654 321 987</li>
          <li><strong>Atención al cliente:</strong> Lunes a Viernes de 9:00 a 18:00</li>
          <li><strong>Instagram:</strong> @tut.rallyshop</li>
          <li><strong>Fundador:</strong> Pablo Rivero Criado</li>
        </ul>
      </div>
    </div>
  );
}

export default Acerca;
