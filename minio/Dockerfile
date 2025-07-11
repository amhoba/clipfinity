FROM minio/minio:RELEASE.2025-06-13T11-33-47Z-cpuv1 AS dev

EXPOSE 9000
EXPOSE 9001

ENTRYPOINT ["minio"]

CMD ["server", "/data", "--console-address", ":9001"]

#
#
#
#
#

FROM dev AS prod