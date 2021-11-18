import { animate, keyframes, state, style, transition, trigger, group } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        'opacity': '1',
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          'opacity': '0',
          transform: 'translateY(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          'opacity': '0',
          transform: 'translateX(-100px)'
        }))
      ])
    ]),
    trigger('list2', [
      state('in', style({
        'opacity': '1',
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            'opacity': '0',
            transform: 'translateX(-100px)'
          }),
          style({
            'opacity': '0.5',
            transform: 'translateX(-500px)'
          }),
          style({
            'opacity': '1',
            transform: 'translateX(-20px)'
          }),
          style({
            'opacity': '1',
            transform: 'translateX(0)'
          })
        ]))
      ]),
      transition('* => void', [
        group([
          animate(300, style({
            'color': 'red',
          })),
          animate(800, style({
            'opacity': '0',
            transform: 'translateX(-100px)'
          }))
        ])
      ])
    ]),
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),      
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(index) {
    this.list.splice(index, 1);
  }

  animation() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  shrink() {
    this.wildState = 'shrunken';
  }

  animationStarted(event){
    console.log(event);
  }

  animationEnded(event){
    console.log(event);
  }
}
