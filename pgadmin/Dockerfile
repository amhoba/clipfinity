FROM dpage/pgadmin4:9.5.0

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=10s CMD nc -w 1 -z -v 0.0.0.0 80 || exit 1