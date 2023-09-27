import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoColor',
  standalone: true
})
export class EstadoColorPipe implements PipeTransform {

  transform(value: string,): string {
    switch (value) {
      case 'CREADO':
        return '#dbeb03';
      case 'EN_PROCESO':
        return '#0703eb';
      case 'TERMINADA':
        return '#03f840';
      case 'NO_COMPLETADO':
        return '#eb0303';
    }
    return '';
  }

}
