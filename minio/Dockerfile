FROM minio/minio:RELEASE.2025-06-13T11-33-47Z-cpuv1 AS dev

EXPOSE 9000

ENTRYPOINT ["minio"]

CMD ["server", "/data", "--console-address", ":9001"]

HEALTHCHECK --interval=10s --start-period=5s CMD curl -f http://localhost:9000/minio/health/ready || exit 1

#
#
#
#
#

FROM dev AS prod