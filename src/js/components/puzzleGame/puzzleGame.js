import renderStartPage from './renderStartPage';
import renderMainPage from './renderMainPage';
import Game from './Game';
import { checkActiveHints } from './utils';

export default function initPuzzleGame() {
  

  const PAGECONTAINER = document.querySelector('.page');
  PAGECONTAINER.innerHTML = '';
  PAGECONTAINER.append(renderStartPage());

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('start__button')) {
      PAGECONTAINER.innerHTML = '';
      PAGECONTAINER.append(renderMainPage());
      const level = 1;
      const round = 1;

      const game = new Game( { level, round });
      game.startNewLevelRound();

      // click events
      document.querySelector('.game__puzzle').addEventListener('click', (event) => {
        const SELECTLEVELOPTION = document.querySelector('.select__level>#slct');
          const SELECTROUNDOPTION = document.querySelector('.select__round>#slct');
          

        if (event.target.closest('.select__round')) {
          game.round = parseInt(SELECTROUNDOPTION.value, 10);
          game.startCurrentLevelRound();
        }
        if (event.target.closest('.select__level')) {
          game.level = parseInt(SELECTLEVELOPTION.value, 10);
          game.round = 1;
          game.startNewLevelRound();
        }

        if (event.target.closest('.data__sentence') && event.target.classList.contains('data__word')) {
          document.querySelector('.result__sentence>.word-container:empty').append(event.target);
        } else if (event.target.classList.contains('dontKnow')) {
          game.buildCurrentSentence();
        } else if (event.target.classList.contains('check')) {
          game.checkCurrentSentence();
        } else if (event.target.classList.contains('continue')) {
          if (!game.isFinished) {
            if (game.currentSentenceNumber < 10) {
              game.startSentence();
            } else if (game.round < game.roundsInLevel) {
              game.round += 1;
              SELECTROUNDOPTION.value = game.round;
              game.startCurrentLevelRound();
            } else if (game.level < 6) {
              game.level += 1;
              game.round = 1;
              SELECTLEVELOPTION.value = game.level;
              SELECTROUNDOPTION.value = game.round;
              game.startNewLevelRound();
            } else {
              // finish();
              console.log('game FINISHED');
              game.isFinished = true;
            }
          }
        } else if (event.target.classList.contains('results') && event.target.classList.contains('game__button')) {
          // STATISTICSECTION.classList.remove('hidden');
          // GAMESECTION.classList.add('hidden');
          // document.querySelector('.statistic-title').textContent = `Level ${game.iLevel} Page ${game.iPage}`;
          // const iDontKnowFragment = document.createDocumentFragment();
          // const iKnowFragment = document.createDocumentFragment();
          // game.dataSentencesObjects.forEach((el) => {
          //   if (el.status === 'iDontKnow') {
          //     const sentence = createStatisticSentence(el);
          //     iDontKnowFragment.append(sentence);
          //   }
          //   if (el.status === 'iKnow') {
          //     const sentence = createStatisticSentence(el);
          //     iKnowFragment.append(sentence);
          //   }
          // });
          // IDONTKNOWSENTENCES.innerHTML = '';
          // IDONTKNOWSENTENCES.append(iDontKnowFragment);
          // IKNOWSENTENCES.innerHTML = '';
          // IKNOWSENTENCES.append(iKnowFragment);
          // if (game.iPage < game.pagesAmountInLevel) {
          //   game.iPage += 1;
          //   SELECTLEVELOPTION.value = game.iLevel;
          //   SELECTPAGEOPTION.value = game.iPage;
          //   game.updateUserSettings();
          // } else if (game.iLevel < 6) {
          //   game.iLevel += 1;
          //   game.iPage = 1;
          //   SELECTLEVELOPTION.value = game.iLevel;
          //   SELECTPAGEOPTION.value = game.iPage;
          //   game.updateUserSettings();
          // } else {
          //   game.isFinished = true;
          // }
        }
    
        
          if (event.target.closest('.menu__button.auto-pronunciation')) {
            if (localStorage.getItem('autoPronunciation') === 'true') {
              localStorage.setItem('autoPronunciation', 'false');
            } else {
              localStorage.setItem('autoPronunciation', 'true');
            }
          } else if (event.target.closest('.menu__button.translation')) {
            if (localStorage.getItem('translation') === 'true') {
              localStorage.setItem('translation', 'false');
            } else {
              localStorage.setItem('translation', 'true');
            }
          } else if (event.target.closest('.menu__button.sentence-pronunciation')) {
            if (localStorage.getItem('sentencePronunciation') === 'true') {
              localStorage.setItem('sentencePronunciation', 'false');
            } else {
              localStorage.setItem('sentencePronunciation', 'true');
            }
          } else if (event.target.closest('.menu__button.bck-image')) {
            if (localStorage.getItem('bckImage') === 'true') {
              localStorage.setItem('bckImage', 'false');
            } else {
              localStorage.setItem('bckImage', 'true');
            }
          }
          checkActiveHints();

        
        

        
          
    
    
        if (event.target.classList.contains('icon__sound')) {
          if (document.querySelector('.menu__button.sentence-pronunciation').classList.contains('active')) {
            game.pronounceCurrentSentence();
          }
        }
        
        game.checkGameStatus();
      });

      // drag events
      document.ondragstart = function onDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.word);
      };

      document.ondragover = function onDragOver(event) {
        event.preventDefault();
        const elements = document.querySelectorAll('.result__sentence.current>.word-container');
        elements.forEach((el) => el.classList.remove('dragOver'));
        if (event.target.classList.contains('word-container') && event.target.closest('.result__sentence.current')) {
          event.target.classList.add('dragOver');
        } else if (event.target.classList.contains('data__word') && event.target.closest('.result__sentence.current')) {
          event.target.parentElement.classList.add('dragOver');
        }
      };

      document.ondrop = function onDrop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const dropStartElement = document.querySelector(`[data-word=${data}]`);
        const dropStartContainer = dropStartElement.parentElement;
        const dropEndElement = event.target;
        if (event.target.classList.contains('word-container')) {
          dropEndElement.append(dropStartElement);
          dropEndElement.classList.remove('dragOver');
        } else if (event.target.classList.contains('data__word')) {
          const dropEndContainer = dropEndElement.parentElement;
          dropEndContainer.append(dropStartElement);
          dropStartContainer.append(dropEndElement);
          dropEndContainer.classList.remove('dragOver');
        }
        game.checkGameStatus();
      };


    }
  });

  

}
