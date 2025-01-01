export interface Usuario {
    usuario_id: number;
    rol_id: number;
    nombre_usuario: string;
    password: string;
    email: string;
    fecha_ultimo_acceso: Date;
    fecha_ultimo_cambio_password: Date;
    intentos_fallidos: number;
    vigencia_dias: number;
    creado_por: string;
    fecha_creacion: Date;
    modificado_por: string; 
    fecha_modificacion: Date;
    estado: number;
  }