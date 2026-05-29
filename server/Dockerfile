# Use an official Python runtime as a parent image
FROM python:3.11.11-slim

# Set environment variables to ensure Python output is logged directly to the terminal
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    # Prevent .pyc files
    PYTHONOPTIMIZE=1

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for psycopg2 and other potential packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    python3-dev \
    libxml2-dev \
    libxslt1-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
# Your requirements.txt is likely in the server directory
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip setuptools wheel \
    && pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
# This copies everything from 'server' directory to /app/
COPY . /app/

# Change to the directory containing manage.py
# This navigates to /app/newsbox/newsbox
WORKDIR /app/newsbox/newsbox

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the port that Gunicorn will use
EXPOSE 8000

# Define the command to run the application
# From /app/newsbox/newsbox, wsgi is in the current 'newsbox' directory
CMD ["gunicorn", "newsbox.wsgi:application", "--bind", "0.0.0.0:8000", "--log-file", "-"]