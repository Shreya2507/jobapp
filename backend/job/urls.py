"""
URL configuration for job project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from jobapp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', UserView.as_view(), name="user-create"),
    path('user/<str:uid>', UserView.as_view(), name="user"),
    path('joblinks/', JoblinkView.as_view(), name="joblinks"),
    path('joblinks/<int:j_id>', JoblinkView.as_view(), name="joblink_delete"),
    path('user/<str:uid>/friends/', FriendlistView.as_view(), name="friendlistview"),
    path('user/<str:uid>/people/', PeoplelistView.as_view(), name="peoplelist"),
]
