from django.urls import path
from . import views

urlpatterns = [
    path("notes/",views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("user/profile/", views.UserProfileView.as_view(), name='user-profile'),
    path("is-superuser/", views.IsSuperUserView.as_view(), name="is-superuser"),
    path("user/", views.UserListView.as_view(), name="user-list"),
    path('user/<int:pk>/', views.UserDeleteView.as_view(), name='user-delete'),
    path("user/<int:pk>/update/", views.UpdateUserView.as_view(), name="user-update"),
]
