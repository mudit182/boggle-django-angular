from django.urls import path
from master import views

urlpatterns = [
    path('getNewBoard/row<int:row>/col<int:col>', views.getNewBoardAndWords, name='getNewBoardAndWords'),
]
