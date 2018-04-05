from django.contrib import admin
from .models import Good, Category, Comment

admin.site.register(Category)
admin.site.register(Good)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'approved')

admin.site.register(Comment, CommentAdmin)