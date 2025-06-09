export interface Usuario {
    nombre_1: string;
    nombre_2: string;
    nombre_3: string;
    nombre_4: string;
    usuario_id: number;
    rol_id: number;
    nombre_usuario: string;
    password: string;
    DNI: number;
    RTN: number;
    pasaporte: string;
    carnet_de_residente: string;
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