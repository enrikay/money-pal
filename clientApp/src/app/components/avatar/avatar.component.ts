import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  /**
* main value to display;

* can be text of svg icon name `bootstrap icon only`
*/
  @Input() data = 'wallet';


  /**
  * Size;
  
  * Both height and width are same
  
  * value type is `number`
  
  * Default is `55px`
  */
  @Input() size = 55;


  /**
  * icon border radius;
  
  * value type is `number`
  
  * default is `100px`
  */
  @Input() borderRadius = 100;


  /**
  * icon content type;
  
  * can be `text` or `svg`
  
  * Default is `text`
  */
  @Input() type = 'text' || 'svg';


  get initial() {
    if (this.type === 'svg') {
      return this.data;
    }
    const converted = this.data.match(/\b(\w)/g);
    if (!converted) {
      return
    }
    return converted.join('');
  }


  get heightWidth() {
    return `${this.size}px`;
  }

  get border_radius() {
    return `${this.borderRadius}px`;
  }


  get fontSize() {
    let sizeUnit = 2;
    const converted = this.data.match(/\b(\w)/g);
    if (!converted) {
      return `${this.size / sizeUnit}px`;
    }

    if (converted?.length === 2 && this.type === 'text') {
      sizeUnit = 2.4;
    }
    if (converted.length > 2 && this.type === 'text') {
      sizeUnit = 2.8;
    }
    if (this.type === 'svg') {
      sizeUnit = 2.4;
    }
    return `${this.size / sizeUnit}px`;
  }



  // get avatarName() {
  //   if (!this.value) {
  //     return;
  //   }
  //   const value = 'djfh get tdja'.split(' ');
  //   const result = value.map(item => item[0]).join('').toUpperCase();
  //   console.log(result);
  //   return result;
  // }


}
