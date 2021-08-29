# Hoover

Hoover is a javascript that takes an input file with the room's dimensions,
starting location, dirt patches and directions then outputs the final location
and number of dirt patches it cleaned.

## Install

Place both the hoover.js and input.txt in the same folder.

## Usage

node hoover.js input.txt

# input.txt is a copy of the instruction for initial testing
node hoover input.txt
# returns
1 3
1

# input1.txt is a longer test that finds more dirt spots
node hoover input1.txt
# returns
1 5
8

# input2.txt is if hoover tries to go outside room parameters
node hoover input2.txt
# returns
Hoover hit the wall
Hoover hit the wall
Hoover hit the wall
Hoover hit the wall
1 1
1

# input3.txt if same dirt patch is give twice only counts once
node hoover input3.txt
# returns
1 2
0
