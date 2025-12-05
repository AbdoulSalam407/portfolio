# Generated migration

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('bio', models.TextField()),
                ('admin_password', models.CharField(default='AsdGoby781209169#', max_length=255)),
                ('about_me', models.TextField(blank=True, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('location', models.CharField(max_length=255)),
                ('avatar', models.TextField()),
                ('social_links', models.JSONField(default=list)),
                ('about_content', models.JSONField(default=dict)),
            ],
            options={
                'db_table': 'api_profile',
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('image', models.TextField()),
                ('technologies', models.JSONField(default=list)),
                ('github_url', models.URLField(blank=True, null=True)),
                ('live_url', models.URLField(blank=True, null=True)),
                ('category', models.CharField(choices=[('web', 'Web'), ('mobile', 'Mobile'), ('data', 'Data'), ('other', 'Other')], max_length=50)),
                ('featured', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'api_project',
                'ordering': ['-created_at'],
            },
        ),
    ]
