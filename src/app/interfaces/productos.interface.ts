export interface Producto {
    producto_id: number;
    codigo_producto: string;
    nombre: string;
    descripcion: string;
    categoria_id: number;
    unidad_medida: string;
    creado_por: string;
    fecha_creacion: Date; // Manejado por el backend, opcional al crear
    modificado_por: string; // Opcional porque puede estar vacío inicialmente
    fecha_modificacion: Date; // Opcional, manejado en actualizaciones
    estado: number; // Representa el estado del producto (activo/inactivo)
  }