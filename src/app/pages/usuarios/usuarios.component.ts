import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../interfaces/usuario.interface';
import { RouterLink } from '@angular/router';
import { TableColums, TableComponent } from '../../components/table/table.component';
import { RolesService } from '../../services/roles.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, TableComponent, FormsModule ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  isVisibleForm = false; // El formulario inicia invisible
  isVisibleTable = true; // El formulario inicia invisible

  rolesActivos: any[] = [];

  nuevoUsuario: any = {};

  usuarios: Usuario[] = [];
  tableColumns: TableColums<Usuario>[] = []

  formData = {
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    email: '',
    rol_id: null,
    DNI: 0,
    RTN: 0,
    pasaporte: '',
    carnet_de_residente: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private rolesService: RolesService
  ) {}


  ngOnInit(): void {
    this.cargarRolesActivos();
    this.getAllUsuarios();
    this.setTableColumns();
  }
  setTableColumns() {
    this.tableColumns = 
    [
      {
        label: 'Usuario ID',
        def: 'usuario_id',
        content: (row) => row.usuario_id.toString(),
      },
      {
        label: 'Usuario',
        def: 'nombre_usuario',
        content: (row) => row.nombre_usuario,
      },
      {
        label: 'Primer nombre',
        def: 'nombre_1',
        content: (row) => row.nombre_1,
      },
      {
        label: 'Segundo nombre',
        def: 'nombre_2',
        content: (row) => row.nombre_2,
      },
      {
        label: 'Primer apellido',
        def: 'nombre_3',
        content: (row) => row.nombre_3,
      },
      {
        label: 'Segundo apellido',
        def: 'nombre_4',
        content: (row) => row.nombre_4,
      },
      {
        label: 'Email',
        def: 'email',
        content: (row) => row.email,
      },
      {
        label: 'Estado',
        def: 'estado',
        content: (row) => row.estado === 1 ? 'Activo': 'otro',
      }
    ]
  }

  //Obtener roles activos de la DBA
  cargarRolesActivos() {
    this.rolesService.getRolesActivos().subscribe({
      next: (data) => {
        this.rolesActivos = data;  // Asumiendo que data es un arreglo de roles
      },
      error: (err) => {
        console.error('Error al cargar roles activos:', err);
      }
    });
  }

  //Obtener todos los usuarios de la DBA
  getAllUsuarios(){
    this.usuarioService.getUsuarios()
    .subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios:', data);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  //hacer visible Form de nuevo usuario
  ActivateNewUser(parameter: boolean){
      this.isVisibleForm = parameter;
      if(parameter){
        this.isVisibleTable = false
      }else if (!parameter){
        this.isVisibleTable = true
      }
  }

async generarNombreUsuario(): Promise<string> {
  const baseInicial = (
    this.formData.nombre1.trim().charAt(0) +
    this.formData.nombre2.trim().charAt(0) +
    this.formData.apellido1.trim() +
    this.formData.apellido2.trim()
  )
    .toLowerCase()
    .replace(/\s/g, '');

  const nombresExistentes = this.usuarios.map(u => u.nombre_usuario.toLowerCase());

  for (let i = 0; i < 100; i++) {
    const sufijo = i.toString().padStart(2, '0'); // siempre 2 dígitos
    const letrasNecesarias = 10 - sufijo.length;
    let base = baseInicial.slice(0, letrasNecesarias);

    // Si la base tiene menos de los caracteres necesarios, se rellena con "x"
    while (base.length < letrasNecesarias) {
      base += 'x';
    }

    const candidato = (base + sufijo).toLowerCase();

    if (!nombresExistentes.includes(candidato)) {
      return candidato;
    }
  }

  throw new Error('No se pudo generar un nombre de usuario único.');
}


  generarPassword(): string {
    const longitud = 20;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      password += caracteres.charAt(indice);
    }
    return password;
  }

  async crearUsuario() {
    try {
      const nombre_usuario = await this.generarNombreUsuario();
      const password_encripted = await this.generarPassword();
      console.log(password_encripted);

      const nuevoUsuario = {
        rol_id: this.formData.rol_id,
        nombre_usuario: nombre_usuario.toUpperCase(),
        password: password_encripted.trim(), // o generar aleatorio
        email: this.formData.email.toUpperCase(),
        nombre_1: this.formData.nombre1.trim().toUpperCase(),
        nombre_2: this.formData.nombre2.trim().toUpperCase(),
        nombre_3: this.formData.apellido1.trim().toUpperCase(),
        nombre_4: this.formData.apellido2.trim().toUpperCase(),
        DNI: this.formData.DNI,
        RTN: this.formData.RTN,
        pasaporte: this.formData.pasaporte.trim(),
        carnet_de_residente: this.formData.carnet_de_residente.trim(),
        fecha_ultimo_acceso: null,
        fecha_ultimo_cambio_password: null,
        intentos_fallidos: 0,
        vigencia_dias: 100,
        creado_por: 'ojumanzor'.toUpperCase(), // puedes usar el usuario logueado
        modificado_por: null,
        fecha_modificacion: null,
        estado: 1
      };

      this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
        next: (response) => {
          alert('✅ Usuario creado exitosamente');
          console.log('Usuario creado:', response);

          this.getAllUsuarios(); // refresca tabla
          this.cargarRolesActivos();
          this.ActivateNewUser(false); // oculta el formulario
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          alert('❌ Error al crear usuario');
        }
      });
    } catch (err) {
      console.error('Error generando usuario único:', err);
      alert('❌ No se pudo generar un nombre de usuario único');
    }
  }


}
