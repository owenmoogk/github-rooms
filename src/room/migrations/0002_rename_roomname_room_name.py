# Generated by Django 3.2.6 on 2022-09-17 21:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='roomName',
            new_name='name',
        ),
    ]