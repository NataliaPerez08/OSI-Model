export const osiLayers = [
  {
    id: 7,
    name: "Capa 7 – Aplicación",
    shortName: "Aplicación",
    description:
      "Interfaz con las aplicaciones del usuario. HTTP, SMTP, FTP, etc.",
    examples: ["HTTP", "HTTPS", "SMTP"],
    pdu: "Datos de aplicación",
    pduShort: "Datos"
  },
  {
    id: 6,
    name: "Capa 6 – Presentación",
    shortName: "Presentación",
    description: "Traducción, cifrado y compresión de datos.",
    examples: ["TLS/SSL", "JPEG"],
    pdu: "Datos formateados / presentados",
    pduShort: "Datos"
  },
  {
    id: 5,
    name: "Capa 5 – Sesión",
    shortName: "Sesión",
    description: "Controla el inicio, mantenimiento y fin de sesiones.",
    examples: ["NetBIOS", "RPC"],
    pdu: "Datos de sesión",
    pduShort: "Datos"
  },
  {
    id: 4,
    name: "Capa 4 – Transporte",
    shortName: "Transporte",
    description: "Entrega extremo a extremo. TCP/UDP.",
    examples: ["TCP", "UDP"],
    pdu: "Segmento (TCP) / Datagrama (UDP)",
    pduShort: "Segmento/Datagrama"
  },
  {
    id: 3,
    name: "Capa 3 – Red",
    shortName: "Red",
    description: "Enrutamiento entre redes. Direcciones lógicas.",
    examples: ["IP", "ICMP"],
    pdu: "Paquete",
    pduShort: "Paquete"
  },
  {
    id: 2,
    name: "Capa 2 – Enlace de Datos",
    shortName: "Enlace",
    description: "Comunicación entre nodos en la misma red física.",
    examples: ["Ethernet", "Wi-Fi"],
    pdu: "Trama",
    pduShort: "Trama"
  },
  {
    id: 1,
    name: "Capa 1 – Física",
    shortName: "Física",
    description: "Transmisión de bits por el medio físico.",
    examples: ["UTP", "Fibra óptica"],
    pdu: "Bits",
    pduShort: "Bits"
  }
];
