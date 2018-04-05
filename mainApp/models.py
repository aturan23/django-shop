from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=30, unique=True, verbose_name="Название")

    def __str__(self):
        return self.name

class Good(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Название")
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)
    price = models.IntegerField(default=0, verbose_name='Стоймость')
    sale = models.IntegerField(default=0, verbose_name='Скидка')
    availability = models.BooleanField(default=True, db_index=True, verbose_name='В наличий да/нет')
    brand = models.CharField(max_length=15, null=True, verbose_name="Бренд")
    img5557101 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 555x710-1")
    img5557102 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 555x710-2")
    img5557103 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 555x710-3")
    img5557104 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 555x710-4")
    img2903701 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 290x370-1")
    img2903702 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 290x370-2")
    img9090 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 90x90")
    img70901 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 70x90-1")
    img70902 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 70x90-2")
    img70903 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 70x90-3")
    img70904 = models.CharField(max_length=30, null=True, verbose_name="Изображение - 70x90-4")
    desc = models.TextField(null=True, verbose_name="Описание")
    in_sale = models.BooleanField(default=True, db_index=True, verbose_name="Скидка да/нет")
    pub_date = models.DateTimeField(auto_now_add=True, editable=True, verbose_name='Дата публикация')

    def __str__(self):
        s = self.name
        if not self.availability:
            s = s + " (нет в наличий) "
        return s

    def get_is_stock(self):
        if self.availability:
            return "+"
        else:
            return ""

class Comment(models.Model):
    post = models.ForeignKey(Good, related_name="comments", on_delete=models.SET_NULL, null=True)
    user = models.CharField(max_length=30, verbose_name="Имя пользователя")
    body = models.TextField(verbose_name="Комментария")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    approved = models.BooleanField(default=False, verbose_name="Проверено")

    def approved(self):
        self.approved = True
        self.save()

    def __str__(self):
        return self.user
