import random
import bisect


class BoggleGame:
    def __init__(self):
        self.row = None
        self.col = None
        self.board = None
        self.validWords = None
        self.boardBeenHere = None
        self.allWords = None
        BoggleGame.vowelDensity = "eeeaaaoooiiuuy"
        BoggleGame.consonantDensity = "nnnnnrrrrrttttttllllssssddddgggghhhhmmmmbbbcccfffpppvvwwjkqxz"

    def generateNewBoard(self, row, col):
        self.row = row
        self.col = col
        self.board = []
        for _ in range(self.row):
            rowContent = [0] * self.col
            self.board.append(rowContent)
        self._fixVowelCellsInBoard()
        self._generateBoardLetters()
        return self.board

    def generateNewBoardAndFindAllWords(self, row, col):
        self.row = row
        self.col = col
        self.board = []
        for _ in range(self.row):
            rowContent = [0] * self.col
            self.board.append(rowContent)
        self._fixVowelCellsInBoard()
        self._generateBoardLetters()
        self._findAllWords()
        return (self.board, self.validWords)

    def findAllWordsForBoard(self, boardLetters, boardRowNum, boardColNum):
        self.row = boardRowNum
        self.col = boardColNum
        self.board = []
        for _ in range(self.row):
            startIndex = self.row * self.col
            endIndex = (self.row + 1) * self.col
            rowContent = boardLetters[startIndex:endIndex]
            self.board.append(rowContent)
        self._findAllWords()
        return self.validWords

    def printBoard(self):
        print('\n')
        for i in range(self.row):
            for j in range(self.col):
                print(self.board[i][j], end=" ")
            print('\n')
        print('\n')

    def _fixVowelCellsInBoard(self):
        for i in range(self.row):
            for j in range(self.col):
                adjacentCellsLetterTypes = self._getAdjacentCellsLetterTypes(
                    i, j)
                numAdjacentVowels = sum(
                    v for v in adjacentCellsLetterTypes if v == 1)
                numAdjacentConsonants = sum(
                    c for c in adjacentCellsLetterTypes if c == 0)
                adjacentVowelSurplus = numAdjacentVowels - numAdjacentConsonants
                decider = random.randint(-4, 4)
                if decider > adjacentVowelSurplus:
                    self.board[i][j] = 1
                else:
                    self.board[i][j] = 0

    def _getAdjacentCellsLetterTypes(self, row, col):
        adjacentCellsLetterTypes = []
        if not self._isOutsideBoard(row, col - 1):
            adjacentCellsLetterTypes.append(self.board[row][col - 1])
        if not self._isOutsideBoard(row - 1, col - 1):
            adjacentCellsLetterTypes.append(self.board[row - 1][col - 1])
        if not self._isOutsideBoard(row - 1, col):
            adjacentCellsLetterTypes.append(self.board[row - 1][col])
        if not self._isOutsideBoard(row - 1, col + 1):
            adjacentCellsLetterTypes.append(self.board[row][col + 1])
        return adjacentCellsLetterTypes

    def _isOutsideBoard(self, row, col):
        return False if (row > -1 and row < self.row and col > -1 and col < self.col) else True

    def _generateBoardLetters(self):
        for i in range(self.row):
            for j in range(self.col):
                if self.board[i][j] == 1:
                    vowelIndex = random.randint(0, len(BoggleGame.vowelDensity) - 1)
                    self.board[i][j] = BoggleGame.vowelDensity[vowelIndex]
                else:
                    consonantIndex = random.randint(
                        0, len(BoggleGame.consonantDensity) - 1)
                    if BoggleGame.consonantDensity[consonantIndex] == 'q':
                        self.board[i][j] = 'qu'
                    else:
                        self.board[i][j] = BoggleGame.consonantDensity[consonantIndex]

    def _findAllWords(self):
        self._readAllExistingWordsFromFile()
        self.validWords = []
        self.boardBeenHere = []
        for _ in range(self.row):
            rowList = [False] * self.col
            self.boardBeenHere.append(rowList)
        for i in range(self.row):
            for j in range(self.col):
                self._startOrExtendLetterSequenceFromCell(i, j)
        self.validWords = sorted(set(self.validWords))

    def _readAllExistingWordsFromFile(self):
        try:
            with open("master/Resources/corncob_lowercase.txt") as file:
                wordsAsString = file.read()
        except FileNotFoundError:
            print("File containing valid words not found!")
            wordsAsString = ''
        self.allWords = wordsAsString.split('\n')

    def _startOrExtendLetterSequenceFromCell(self, r, c, sequence=None):
        if sequence is None:
            sequence = self.board[r][c]
        else:
            sequence += self.board[r][c]
        self.boardBeenHere[r][c] = True
        adjacentCells = self._getAllAdjacentCells(r, c)
        for cell in adjacentCells:
            if not self.boardBeenHere[cell[0]][cell[1]]:
                possibleSequence = sequence + self.board[cell[0]][cell[1]]
                if self._letterSequenceStillValid(possibleSequence):
                    self._startOrExtendLetterSequenceFromCell(
                        cell[0], cell[1], sequence)
        if len(sequence) > 3 and self._isInDatabase(sequence):
            self.validWords.append(sequence)
        self.boardBeenHere[r][c] = 0

    def _getAllAdjacentCells(self, r, c):
        allAdjacentCells = []
        possibleAdjacentCells = [(r, c + 1), (r + 1, c + 1), (r + 1, c),
                                 (r + 1, c - 1), (r, c - 1), (r - 1, c - 1),
                                 (r - 1, c), (r - 1, c + 1)]
        for possibleCell in possibleAdjacentCells:
            if not self._isOutsideBoard(possibleCell[0], possibleCell[1]):
                allAdjacentCells.append(possibleCell)
        return allAdjacentCells

    def _letterSequenceStillValid(self, word):
        wordIndex = bisect.bisect_left(self.allWords, word)
        return True if (wordIndex != len(self.allWords) and self.allWords[wordIndex].startswith(word)) else False

    def _isInDatabase(self, word):
        wordIndex = bisect.bisect_left(self.allWords, word)
        return True if (wordIndex != len(self.allWords) and self.allWords[wordIndex] == word) else False
