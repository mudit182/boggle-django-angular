from django.db import models

# Create your models here.

class RandomGeneratorInfo(models.Model):
    seed = models.IntegerField()
    
    class Meta:
        managed=True
        db_table = 'random_generator_info'


class BoggleBoard(models.Model):
    rows = models.IntegerField(max_length=2)
    cols = models.IntegerField(max_length=2)
    letters = models.CharField(max_length=255)
    numOfWords = models.IntegerField(max_length=8)
    randomGeneratorInfo = models.OneToOneField('RandomGeneratorInfo', related_name='boggle_board', on_delete=models.DO_NOTHING)

    class Meta:
        managed=True
        db_table = 'boggle_board'
