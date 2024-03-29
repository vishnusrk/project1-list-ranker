/*
Vishnu Sreekanth

List Ranker

ChoiceButtons.js

This is the file for the ChoiceButtons component, which renders the two 
buttons with items for the user to choose between to facilitate the ranking 
process.
*/

import React from 'react';
import './App.css';

/*
ChoiceButtons is a class component. It has one props attribute, and five state 
attributes. Its props attribute, items, is the array of elements that is 
generated by the ListEntryBox component. Its state attributes serve different 
purposes, and their uses are explained below.
*/

class ChoiceButtons extends React.Component {

    /*
    Component constructor. The first state attribute, indexCounter, is 
    initialized to 0, and is used to access elements in the ranked array to 
    be compared to an unranked element. firstItem is the item corresponding to 
    the first button, and secondItem is the item corresponding to the second 
    button. orderedArray is the ranked list, which naturally grows in size 
    as the ranking goes on, and rankingComplete keeps track of whether the 
    ranking is finished or not, so that the component can render accordingly.
    */

    constructor(props) {
  
      super(props);
      this.state = {
        indexCounter: 0,
        firstItem: this.props.items[0],
        secondItem: this.props.items[1],
        orderedArray: [],
        rankingComplete: false,
      };
  
    }
  
    /*
    Render function, if rankingComplete is true, then the ranked list is 
    displayed in place of the choice buttons. Otherwise, the choice buttons 
    are shown, with the firstItem and secondItem being displayed on them.
    */

    render() {
  
      if (this.state.rankingComplete) {
        return (
          <center>
            <h2 className="rankedList">
                {this.getRankedListString(this.state.orderedArray)}
            </h2>
          </center>
        );
      } else {
        return (
          <div className="choiceButtonPanel">
            <button className="choiceButton1" 
                    onClick={() => this.chooseFirstButtonItem()}>
                {this.state.firstItem}
            </button>
            <button className="choiceButton2" 
                    onClick={() => this.chooseSecondButtonItem()}>
                {this.state.secondItem}
            </button>
          </div>
        );
      }
  
    }
  
    /*
    Onclick function for the first choice button (the button on the left or 
    top, depending on window width). Since firstItem is displayed on the first 
    button and secondItem is displayed on the second button (the button on the 
    right or bottom, depending on window width), this function makes sure that 
    firstItem is placed above secondItem in orderedArray. It accounts for all 
    of the different scenarios/cases that can arise during the ranking process, 
    which are indicated throughout the function's code.
    */

    chooseFirstButtonItem() {
        
        /*
        Case for when no items have been ranked yet. Places the first item over 
        the second in orderedArray, and then executes a callback, which checks 
        if all of the items have been ranked, by seeing if the lengths of 
        the items props attribute and orderedArray are equal. 
        */
        if (this.state.orderedArray.length === 0) {
            this.setState(
                {
                    /*
                    firstItem is ranked above secondItem, and is thus placed 
                    above it in orderedArray.
                    */
                    orderedArray: [
                        ...this.state.orderedArray, 
                        this.state.firstItem, 
                        this.state.secondItem
                    ]
                }, 
                () => {
                    /*
                    Case for when all of the items have been ranked. 
                    rankingComplete is set to true and nothing further is done.
                    */
                    if (this.state.orderedArray.length ===
                        this.props.items.length) {
                            this.setState({rankingComplete: true});
                    /*
                    Case for when there are still items left to be ranked.
                    */
                    } else {
                        this.setState(
                            {
                                /*
                                secondItem is set to the next unranked 
                                item, whose index in items corresponds with the 
                                size of orderedArray (for example, firstItem 
                                and secondItem are initialized to items[0] and 
                                items[1], and both get ranked at once - the 
                                next unranked item would then be items[2], 
                                whose index is the same as the number of 
                                elements in orderedArray, 2).
                                */
                                secondItem: this.props.items[
                                        this.state.orderedArray.length
                                ]
                            }
                        );
                    }
                }
            );
        /* 
        Case for when there have been some items that have already been ranked 
        (when orderedArray is not empty)
        */
        } else {
            /*
            Case where firstItem has already been ranked, and is thus in 
            orderedArray.
            */
            if (this.state.orderedArray.includes(this.state.firstItem)) {
                /*
                Case where indexCounter, which is an integer that is used to 
                extract items from orderedArray to be compared with an unranked 
                item, has reached the length of orderedArray - 1, indicating 
                that there are no more items in orderedArray left to compare 
                to the unranked item.
                */
                if (this.state.indexCounter ===
                    this.state.orderedArray.length - 1) {
                        this.setState(
                            {
                                /*
                                secondItem, which is the unranked item, is 
                                placed at the end of orderedArray, since all
                                elements in  orderedArray have been compared 
                                with it and chosen over it. indexCounter is 
                                reset to 0 before the next unranked item's 
                                ranking.
                                */
                                orderedArray: [
                                    ...this.state.orderedArray, 
                                    this.state.secondItem
                                ], 
                                indexCounter: 0
                            }, 
                            () => {
                                /*
                                Case for when all of the items have been ranked. 
                                rankingComplete is set to true and nothing 
                                further is done.
                                */
                                if (this.state.orderedArray.length ===
                                    this.props.items.length) {
                                        this.setState({rankingComplete: true});
                                /*
                                Case for when there are still items left to be 
                                ranked.
                                */
                                } else {
                                    this.setState(
                                        {
                                            /*
                                            Sets firstItem to be the first item  
                                            of orderedArray, which is the
                                            currently highest ranked element.
                                            */
                                            firstItem: this.state.orderedArray[
                                                this.state.indexCounter
                                            ]
                                        },
                                        () => {
                                            this.setState(
                                                {
                                                    /*
                                                    Sets secondItem to be the 
                                                    next unranked item, using 
                                                    the orderedArray length  
                                                    paradigm explained above.
                                                    */
                                                    secondItem: this.props.items[
                                                        this.state.orderedArray.length
                                                    ]
                                                }
                                            );
                                        }
                                    );
                                }
                            }
                        );
                /*
                Case where there are more items in orderedArray to be compared 
                to the unranked item.
                */
                } else {
                    this.setState(
                        /*
                        indexCounter gets incremented to access the next item 
                        in orderedArray
                        */
                        {indexCounter: this.state.indexCounter + 1},
                        () => {
                            /*
                            Case for when all of the items have been ranked. 
                            rankingComplete is set to true and nothing further 
                            is done.
                            */
                            if (this.state.orderedArray.length === 
                                this.props.items.length) {
                                    this.setState({rankingComplete: true});
                            /*
                            Case for when there are still items left to be 
                            ranked.
                            */
                            } else {
                                this.setState(
                                    {
                                        /*
                                        firstItem gets set to the next item 
                                        in orderedArray using the now 
                                        incremented indexCounter.
                                        */
                                        firstItem: this.state.orderedArray[
                                            this.state.indexCounter
                                        ]
                                    }
                                );
                            }
                        }
                    );
                }
            /* 
            Case where firstItem is an unranked item that is not in
            orderedArray.
            */
            } else {
                this.setState(
                    {
                        /*
                        firstItem is placed right before secondItem in the 
                        orderedArray, since it was chosen over secondItem. 
                        indexCounter is reset to 0 before the next unranked 
                        item's ranking.
                        */
                        orderedArray: [
                            ...this.state.orderedArray.slice(
                                0, 
                                this.state.orderedArray.indexOf(
                                    this.state.secondItem
                                )
                            ), 
                            this.state.firstItem, 
                            ...this.state.orderedArray.slice(
                                this.state.orderedArray.indexOf(
                                    this.state.secondItem
                                )
                            )
                        ], 
                        indexCounter: 0
                    },
                    () => {
                        /*
                        Case for when all of the items have been ranked. 
                        rankingComplete is set to true and nothing further 
                        is done.
                        */
                        if (this.state.orderedArray.length === 
                            this.props.items.length) {
                                this.setState({rankingComplete: true});
                        /*
                        Case for when there are still items left to be 
                        ranked.
                        */
                        } else {
                            this.setState(
                                {
                                    /*
                                    firstItem gets set to the first item of 
                                    orderedArray, which is currently the
                                    highest ranked element.
                                    */
                                    firstItem: this.state.orderedArray[
                                        this.state.indexCounter
                                    ], 
                                    /*
                                    Sets secondItem to be the next unranked 
                                    item, using the orderedArray length 
                                    paradigm explained above.
                                    */
                                    secondItem: this.props.items[
                                        this.state.orderedArray.length
                                    ]
                                }
                            );
                        }
                    }
                );
            }
        }
  
    }
  
    /*
    Onclick function for the second choice button (the button on the right or 
    bottom, depending on window width). Since secondItem is displayed on the 
    second button and firstItem is displayed on the first button (the button on 
    the left or top, depending on window width), this function makes sure that 
    secondItem is placed above firstItem in orderedArray. It accounts for all 
    of the different scenarios/cases that can arise during the ranking process. 
    It works exactly the same as chooseFirstButtonItem, but here, every 
    reference to firstItem is switched to be secondItem, and vice versa.
    */

    chooseSecondButtonItem() {
  
        if (this.state.orderedArray.length === 0) {
            this.setState(
                {
                    orderedArray: [
                        ...this.state.orderedArray, 
                        this.state.secondItem, 
                        this.state.firstItem
                    ]
                }, 
                () => {
                    if (this.state.orderedArray.length === 
                        this.props.items.length) {
                            this.setState({rankingComplete: true});
                    } else {
                        this.setState(
                            {
                                firstItem: this.props.items[
                                    this.state.orderedArray.length
                                ]
                            }
                        );
                    }
                }
            );
        } else {
            if (this.state.orderedArray.includes(this.state.secondItem)) {
                if (this.state.indexCounter === 
                    this.state.orderedArray.length - 1) {
                        this.setState(
                            {
                                orderedArray: [
                                    ...this.state.orderedArray, 
                                    this.state.firstItem
                                ], 
                                indexCounter: 0
                            }, 
                            () => {
                                if (this.state.orderedArray.length === 
                                    this.props.items.length) {
                                        this.setState({rankingComplete: true});
                                } else {
                                    this.setState(
                                        {
                                            secondItem: this.state.orderedArray[
                                                this.state.indexCounter
                                            ]
                                        },
                                        () => {
                                            this.setState(
                                                {
                                                    firstItem: this.props.items[
                                                        this.state.orderedArray.length
                                                    ]
                                                }
                                            );
                                        }
                                    );
                                }
                            }
                        );
                } else {
                    this.setState(
                        {indexCounter: this.state.indexCounter + 1},
                        () => {
                            if (this.state.orderedArray.length === 
                            this.props.items.length) {
                                this.setState({rankingComplete: true});
                            } else {
                                this.setState(
                                    {
                                        secondItem: this.state.orderedArray[
                                            this.state.indexCounter
                                        ]
                                    }
                                );
                            }
                        }
                    );
                }
            } else {
                this.setState(
                    {
                        orderedArray: [
                            ...this.state.orderedArray.slice(
                                0, 
                                this.state.orderedArray.indexOf(
                                    this.state.firstItem
                                )
                            ), 
                            this.state.secondItem, 
                            ...this.state.orderedArray.slice(
                                this.state.orderedArray.indexOf(
                                    this.state.firstItem
                                )
                            )
                        ], 
                        indexCounter: 0
                    },
                    () => {
                        if (this.state.orderedArray.length === 
                            this.props.items.length) {
                                this.setState({rankingComplete: true});
                        } else {
                            this.setState(
                                {
                                    firstItem: this.props.items[
                                        this.state.orderedArray.length
                                    ], 
                                    secondItem: this.state.orderedArray[
                                        this.state.indexCounter
                                    ]
                                }
                            );
                        }
                    }
                );
            }
        }
  
    }

    
    /*
    Returns a numbered string of the ranked list to be displayed on the page. 
    Is called by render once all of the items have been ranked 
    (once rankingComplete is true). orderedArray is passed as the argument. 
    */

    getRankedListString(list) {
  
      let rankedListString = "Your Ranked List:\n\n";
      for (let i = 0; i < list.length; i++) {
        if (i === 0) {
          rankedListString += (i + 1) + ". " + list[i];
        } else {
          rankedListString += "\n" + (i + 1) + ". " + list[i];
        }
      }
      return rankedListString;
  
    }
  
}

export default ChoiceButtons;