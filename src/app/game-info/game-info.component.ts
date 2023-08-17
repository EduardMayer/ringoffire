import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardActions = [
    {
      cardName: 'Two for You',
      description: 'Choose someone to take two drinks.',
    },
    {
      cardName: 'Three for Me',
      description: 'Take three drinks.',
    },
    {
      cardName: 'Floor',
      description:
        'Everyone races to touch the floor, the last person to do so drinks.',
    },
    {
      cardName: 'Thumb Master',
      description:
        'Whenever you put your thumb on the table, everyone else must do the same. The last person to do it drinks.',
    },
    {
      cardName: 'Six for Dicks',
      description: 'All guys take a drink.',
    },
    {
      cardName: 'Heaven',
      description: 'Everyone points to the sky, the last person drinks.',
    },
    {
      cardName: 'Mate',
      description:
        'Choose someone to be your mate. Whenever you drink, they drink, and vice versa.',
    },
    {
      cardName: 'Rhyme',
      description:
        "Say a word, and everyone else must say a word that rhymes. The person who can't think of a word quickly drinks.",
    },
    {
      cardName: 'Categories',
      description:
        "Choose a category, and everyone must say something from that category. The first person who can't think of something drinks.",
    },
    {
      cardName: 'Never Have I Ever',
      description:
        "Everyone puts up three fingers. Going around the circle, each person says something they've never done. If you've done it, put a finger down. The first person with no fingers up drinks.",
    },
    {
      cardName: 'Questions',
      description:
        "You ask someone a question, and they must ask someone else a question. This goes on until someone can't think of a question, and they drink.",
    },
    {
      cardName: 'Kings Cup',
      description:
        'Pour a little bit of your drink into a communal cup. The person who draws the fourth King must drink the entire cup.',
    },
    {
      cardName: 'Waterfall',
      description:
        'Everyone starts drinking, and no one can stop until the person to their right stops.',
    },
  ];

  cardName = '';
  description = '';
  @Input() card: string | undefined;

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.cardName = this.cardActions[cardNumber - 1].cardName;
      this.description = this.cardActions[cardNumber - 1].description;
    }
  }
}
