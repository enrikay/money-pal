import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

import { map } from 'rxjs/operators';
import { merge, fromEvent, Observable, Observer } from 'rxjs';

import { StorageService } from './storage.service';
// import { DeviceDetectorService } from 'ngx-device-detector';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private title: Title,
    private meta: Meta,
    private storageService: StorageService,
    // private deviceService: DeviceDetectorService
  ) { }



  /**
 * Sets page title.
 * 
 * Returns `Void`
 */
  setPageTitle(pageTitle: string, includeBranch = false) {
    // sets page title when called
    const branch = this.storageService.getSelectedBranchOBJ();

    if (includeBranch && branch) {
      pageTitle = `${pageTitle} in  ${branch.name.toUpperCase()} `
    }

    this.title.setTitle(`${pageTitle} - MoneyPal`);
  }


  /**
* Sets page Metadata
*/
  setPageMetaData(metaDatas: MetaDefinition[]) {
    this.meta.addTags(metaDatas);
  }


  /**
 * Check for current device screen size.
 * 
 * Returns `true` if desktop screen or `false` for smaller screens.
 */
  getIsDesktopDevice() {
    // this returns true if is a computer screen size 
    // return this.deviceService.isDesktop();
  }


  copyText() {
    // var copyTextareaBtn = document.querySelector('.js-textareacopybtn');

    // copyTextareaBtn.addEventListener('click', function (event) {
    //   var copyTextarea = document.querySelector('.js-copytextarea');
    //   copyTextarea.focus();
    //   copyTextarea.select();

    //   try {
    //     var successful = document.execCommand('copy');
    //     var msg = successful ? 'successful' : 'unsuccessful';
    //     console.log('Copying text command was ' + msg);
    //   } catch (err) {
    //     console.log('Oops, unable to copy');
    //   }
    // });
  }


  /**
   *  function observes internet connection
   * 
   * Returns return boolean on internet change
   */
  observeInternetConnection() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }


}
