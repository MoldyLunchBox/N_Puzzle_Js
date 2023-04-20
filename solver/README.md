 8  5  4 
 1  6  2 
 █  7  3 
================
steps: 36
time complexity: 256
size complexity: 203
duration: [ 0, 249384463 ]






--- Puzzle ---
================
 1  █  2 
 8  5  4 
 7  6  3 
================
steps: 19
time complexity: 195
size complexity: 127
duration: [ 3, 678270934 ]




--- Puzzle ---
================
 1  █  2 
 8  5  4 
 7  6  3 
================
steps: 31
time complexity: 164
size complexity: 101
duration: [ 2, 683449689 ]


   for (var q = 0; q < this.openList.length; q++){
                        printPuzzle(this.openList[q].state, this.openList[q].score)
                    }
                    console.log("\n\n\n")

                    if (this.visitedTimes == 6){

                        exit()
                    }






                          for (var q = 0; q < this.openList.priv.data.length; q++){
                        printPuzzle(this.openList.priv.data[q].state, this.openList.priv.data[q].score)
                    }
                    console.log("\n\n\n")
                    if (this.visitedTimes == 6){
                        
                        exit()
                    }