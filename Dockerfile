# Simple Nginx static site – perfect for Kubernetes deployment
FROM nginx:alpine

LABEL maintainer="MediCare HMS"
LABEL description="Hospital Management & Appointment System"

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy project files
COPY . /usr/share/nginx/html/

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]