from master.boggleGame import BoggleGame
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def getNewBoardAndWords(_request, row, col):
    response = {
        'status': False
    }
    game = BoggleGame()
    board, words = game.generateNewBoardAndFindAllWords(row, col)
    response['board'] = board
    response['words'] = words
    response['status'] = True
    return JsonResponse(response)

