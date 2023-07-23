from django.urls import path
from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def serveBuiltAngularApp(request):
    print('here')
    return render(request, 'index.html')


urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='serveBuiltAngularApp'),
]
