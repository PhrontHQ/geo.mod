var EsriSymbolToStyleConverter = require("geo.mod/logic/converter/esri-symbol-to-style-converter").EsriSymbolToStyleConverter;

describe("A Esri Symbol To Style Converter", function () {

    var EARTHQUAKE_SYMBOL_PNG = {
        "type": "esriPMS",
        "url": "ff974a66e72ffc726d96fb4c86e30ed8",
        "imageData": "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAARdJREFUGJV90DFLw2AQxvF/y5tMlRaEYMAhS0kGpUMFCSIoRHHoJ3BJ6C4OgqX4FYqTH8IxQ3ah2GyFdBVCh4SmSMWWF7dQXKyEWvtMB/e7gzvB35SBKrAAlsWGKNRV3/c79Xr9rFar7UopP8fjcb/b7T5GUTQt4p0wDJ9t274qbjJN81jX9SPP866jKJoKgCAIOutwlUajcd7r9R4cx7kRAIZhXG6CqxiGcQGUBYCqqvo2XKlU9oCqAMjzfA7s/4ellHNgIQCyLOtblnVQKpU24slk8gosBUCapvfD4fC02Wwerg+MRqO3OI7v4Od1rut+BUFwMhgMnjRNcxRF0fI8/5jNZi9Jkty22+33XwzQarUk4G479Bski1p+Rt2hTgAAAABJRU5ErkJggg==",
        "contentType": "image/png",
        "width": 8,
        "height": 8,
        "angle": 0,
        "xoffset": 0,
        "yoffset": 0
    };

    var APPLE_SYMBOL_SVG = {
        "angle": 0,
        "xoffset": 0,
        "yoffset": 0,
        "type": "esriPMS",
        "url": "6277ab0b-b07e-4803-ad4f-c811f0588a21",
        "width": 11.25,
        "height": 13.35375,
        "imageData": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjEwMDAiCiAgIHZpZXdCb3g9IjAgMCAxMDAwIDExODcuMTk4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGhlaWdodD0iMTE4Ny4xOTgiCiAgIGlkPSJzdmcyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iQXBwbGVfMTk5OC5zdmciPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTEwIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZGVmcwogICAgIGlkPSJkZWZzOCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzNjYiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNzA1IgogICAgIGlkPSJuYW1lZHZpZXc2IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjE3Njc3NjciCiAgICAgaW5rc2NhcGU6Y3g9Ii0xMDY2LjUwNDUiCiAgICAgaW5rc2NhcGU6Y3k9Ijk2NC45NDY2OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMiIgLz4KICA8cGF0aAogICAgIGQ9Im0gOTc5LjA0MTg0LDkyNS4xODc4NSBjIC0xNy45NTM5Nyw0MS40NzczNyAtMzkuMjA1NjMsNzkuNjU3MDUgLTYzLjgyODI0LDExNC43NTg5NSAtMzMuNTYyOTgsNDcuODUyOCAtNjEuMDQzNTYsODAuOTc2MSAtODIuMjIxOTQsOTkuMzY5OCAtMzIuODMwMTMsMzAuMTkyIC02OC4wMDUyOSw0NS42NTQ0IC0xMDUuNjcyMDMsNDYuNTMzOCAtMjcuMDQwODksMCAtNTkuNjUxMiwtNy42OTQ2IC05Ny42MTEwNSwtMjMuMzAzNSAtMzguMDg0NDIsLTE1LjUzNTggLTczLjA4MzcxLC0yMy4yMzAzIC0xMDUuMDg1NzgsLTIzLjIzMDMgLTMzLjU2Mjk2LDAgLTY5LjU1ODg4LDcuNjk0NSAtMTA4LjA2MTAxLDIzLjIzMDMgLTM4LjU2MDgsMTUuNjA4OSAtNjkuNjI0ODQsMjMuNzQzMiAtOTMuMzc1NDEsMjQuNTQ5MyAtMzYuMTIwNDksMS41Mzg5IC03Mi4xMjM3LC0xNC4zNjMyIC0xMDguMDYxMDEsLTQ3Ljc3OTYgLTIyLjkzNzExLC0yMC4wMDU5IC01MS42MjY4NCwtNTQuMzAxNyAtODUuOTk1OTIsLTEwMi44ODc0IEMgOTIuMjU0MTc2LDk4NC41NDU5MiA2MS45Mzc1ODgsOTI0LjM4MTc1IDM4LjE4NzAyOCw4NTUuNzkwMiAxMi43NTA5OTUsNzgxLjcwMjUyIDAsNzA5Ljk1OTg2IDAsNjQwLjUwMzYxIDAsNTYwLjk0MTgxIDE3LjE5MTg1OSw0OTIuMzIwOTQgNTEuNjI2ODY5LDQzNC44MTY4OCA3OC42ODk3NTQsMzg4LjYyNzUzIDExNC42OTI5OSwzNTIuMTkxOTIgMTU5Ljc1MzgxLDMyNS40NDQxMyBjIDQ1LjA2MDg2LC0yNi43NDc3NSA5My43NDkxNCwtNDAuMzc4MTIgMTQ2LjE4MjEyLC00MS4yNTAxOSAyOC42ODk3MSwwIDY2LjMxMjUsOC44NzQ0IDExMy4wNjYxMywyNi4zMTU0MiA0Ni42MjE3NCwxNy40OTk2NCA3Ni41NTcyNywyNi4zNzQwNCA4OS42ODE5OCwyNi4zNzQwNCA5LjgxMjQsMCA0My4wNjc1OCwtMTAuMzc2NjkgOTkuNDQzMSwtMzEuMDY0MDUgNTMuMzEyMzcsLTE5LjE4NTEyIDk4LjMwNzI0LC0yNy4xMjg4NyAxMzUuMTY3ODcsLTIzLjk5OTc1IDk5Ljg4MjgsOC4wNjA5OCAxNzQuOTIzMTMsNDcuNDM1MTggMjI0LjgyNzg5LDExOC4zNzE3NCAtODkuMzMwMjMsNTQuMTI1NzggLTEzMy41MTkwMywxMjkuOTM1NTYgLTEzMi42Mzk2NiwyMjcuMTg3NTMgMC44MDYxLDc1Ljc1MTE1IDI4LjI4NjY4LDEzOC43ODc5NSA4Mi4yOTUyLDE4OC44MzkzIDI0LjQ3NjAzLDIzLjIzMDIyIDUxLjgxMDA4LDQxLjE4NDIxIDgyLjIyMTg2LDUzLjkzNTIyIC02LjU5NTI1LDE5LjEyNjQ4IC0xMy41NTcsMzcuNDQ2ODggLTIwLjk1ODQ2LDU1LjAzNDQ2IHogTSA3NDkuOTYzNjYsMjMuNzUxMjM3IGMgMCw1OS4zNzM0MyAtMjEuNjkxMzgsMTE0LjgxMDIzMyAtNjQuOTI3NDgsMTY2LjEyMTk2MyAtNTIuMTc2NTIsNjAuOTk5NjEgLTExNS4yODY1OCw5Ni4yNDgwMyAtMTgzLjcyNDI2LDkwLjY4NTk3IC0wLjg3MjA0LC03LjEyMjk4IC0xLjM3NzY5LC0xNC42MTk2NyAtMS4zNzc2OSwtMjIuNDk3NDMgMCwtNTYuOTk4NDMgMjQuODEzMTUsLTExNy45OTgwMSA2OC44NzczOCwtMTY3Ljg3MzQ1MyAyMS45OTkwOSwtMjUuMjUyODEgNDkuOTc4LC00Ni4yNTAxOCA4My45MDczOCwtNjMuMDAwMTggQyA2ODYuNTc1MDcsMTAuNjg4MDI3IDcxOC41OTkxMywxLjU2MzEyNzQgNzQ4LjcxNzgzLDUuMjczNDM3NmUtNCA3NDkuNTk3MjcsNy45Mzc4Mjc0IDc0OS45NjM2NiwxNS44NzU2MjcgNzQ5Ljk2MzY2LDIzLjc1MDQ2NyBaIgogICAgIGlkPSJwYXRoNCIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgo8L3N2Zz4K",
        "contentType": "image/svg+xml"
    };

   var SIMPLE_SYMBOL_JPEG = {
        "angle": 0,
        "xoffset": 0,
        "yoffset": 0,
        "type": "esriPMS",
        "url": "6277ab0b-b07e-4803-ad4f-c811f0588a21",
        "width": 27,
        "height": 27,
        "imageData": "/9j/4AAQSkZJRgABAQAASABIAAD/4QCkRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgE7AAIAAAAYAAAAWodpAAQAAAABAAAAcgAAAAAAAABIAAAAAQAAAEgAAAABVmVjdG9yU3RvY2suY29tLzgyNTI5MDgAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAACSgAwAEAAAAAQAAACQAAAAA/+EJuGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPiA8ZGM6Y3JlYXRvcj4gPHJkZjpTZXE+IDxyZGY6bGk+VmVjdG9yU3RvY2suY29tLzgyNTI5MDg8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L2RjOmNyZWF0b3I+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz4A/+0AZFBob3Rvc2hvcCAzLjAAOEJJTQQE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",
        "contentType": "image/jpeg"
    }

    var CIRCLE_SYMBOL = {
        type: "esriSMS",
        style: "esriSMSCircle",
        color: [
            230,
            0,
            0,
            255
        ],
        size: 4,
        angle: 0,
        xoffset: 0,
        yoffset: 0,
        outline: null
    };

    var SQUARE_SYMBOL = {
        "type": "esriSMS",
        "style": "esriSMSSquare",
        "color": [
            76,
            115,
            0,
            255
        ],
        "size": 8,
        "angle": 0,
        "xoffset": 0,
        "yoffset": 0,
        "outline": {
            "color": [
                152,
                230,
                0,
                255
            ],
            "width": 1
        }
    };

    var DIAMOND_SYMBOL = {
        type: "esriSMS",
        style: "esriSMSDiamond",
        color: [
            255,
            255,
            0,
            255
        ],
        size: 7,
        angle: 0,
        xoffset: 0,
        yoffset: 0,
        outline: {
            color: [
                0,
                0,
                0,
                255
            ],
            width: 1
        }
    };

    var POLYLINE_SYMBOL = {type: "esriSLS",
        style: "esriSLSSolid",
        color: [255, 0, 0, 255],
        width: 1.2
    };

    var POLYGON_SYMBOL = {
        type: "esriSFS",
        style: "esriSFSSolid",
        color: [255, 102, 51, 255],
        outline: {
            type: "esriSLS",
            style: "esriSLSSolid",
            color: [0, 0, 0, 0],
            width: 0.4
        }
    };

    it("can convert a point png picture symbol to style", function (done) {
        var converter = new EsriSymbolToStyleConverter();
        converter.convert(EARTHQUAKE_SYMBOL_PNG).then(function (style) {
            expect(style).toBeDefined();
            expect(style.icon).toBeDefined();
            expect(style.icon.scaledSize).toBeDefined();
            expect(style.icon.anchor).toBeDefined();
            expect(style.icon.size).toBeDefined();
            expect(style.icon.scaledSize.width).toBe(11);
            expect(style.icon.size.width).toBe(22);
            expect(style.icon.symbol).toBeDefined("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEWElEQVRIS5WUy28bVRTG79zxHc9cx3HGHmcSp3GqNkAxIRHgNA8aYYtFFwghsahYsGKFhBT+Be+y8KoSC6RKqLtsUBaVKqurOqQ0JUqqisrGmKImJDhubZyx5+E7nhe6Qw2lgjQ5m9FI3/mdT+ecexjw8mAAAAgAEHwmNQEAFgDAOy6VJj0f9B/m83n+zJkzkXg8PhAOhwXXdflut8tT4eDgIIEQEkVRiK7rWrlc7hQKhW6xWHSeL/YimKXucrlcIpVKTYmieD4ajY5gjIeCwaDgeR5j2zYhhHKVuqIojyuVSunGjRs1hBCF232XfTD9MisrK9TlWCKRuBCLxWZDodBrGOMRjuOGEEJBhmGAZVm9Xq/XJoQ8MQzjl2azuXN4eFjpdDq/ra2tHfWd98GQOr1+/frk+Ph4VpKki6OjoymM8SjDMDyEEEEIqQZ4nue6rmu5rmsSQurNZrPabDa3Hz16dPvatWvVvnMfnM/nQ7Ztx9Pp9NsjIyMfiaI4K0nSWDAYHDxuQKZpau12+1BRlPt7e3s3S6XSNsuyvy8vL3d88OrqagIh9M7Zs2ffnZiYeD8cDr+KEBKo0+PAruvalmXRIf66t7e3Ua/X77Ase/fy5cv7Pnh9ff0V13U/kGU5k0wmaW8TL9/CfxSGYTw5ODh42Gq1igCAtYWFhZ988M7OzjSE8NNIJJKRZfk8xjh6GjAhpNNoNA40TSvatv3N9PT0fR9cqVTSrut+PjAwkInH4zLP8wOnAZumSffvSNO07xRF+SqdTm/54Gq1OgcAWBYEISNJksjzvHAacK/Xs1RV1TVNu7O/v391aWnpBx9cLpfnWZb9EmNMwUM8z/uv7KRBwZ1Op2sYxgYFX7p06Z4PLpVKFyGEX9BWxGIxSRAEfFIo1ZmmaR4dHamGYaxrmnZ1ZmbmL8cPHjx4CwDwWSQSeW94eDiJMY6cBkwI0RqNxhNVVdc9z/t6ampq2wdvbm6+7rrux5IkZcbGxt7EGMv0+Z40dF3/o1arVRVFoVuxuri4+NDPvnXr1jiEcEGW5aVEIpHBGE9yHIdYlqVH6X/DcRzXsizLMIzdWq129+nTpxsQwtvZbHa3Dw6xLCtHo9E5jPEnoVBoNhaL0e3gj3NOCKG97ei6fr/dbn9br9fvGYaxf+XKlbYPzuVyMJVKBZLJ5AWGYT6MRCJzkiRN8jw/DCGkG8IBANhnRRzP8yzP8+j5bLZarceqqm7pun6zWq2Wz507181ms/bfZzOXyzHz8/NDoiiOI4SmeZ5fQgi9gRBKsCwr0gIU7Hme6TiOYllW3bbtMiHke13Xf1RVdZfjuFYmk3EYhvH+NSHP82ChUEChUCgJIZznef4CxjjBcZzIsixPD73jOKZt20q32z00TfNn0zS3Go3GbjweJ9RpfyAvgv2DXywWMcdxMY7jwoIgCIFAgOM4Dtq2zUAIHdM0LdoHTdPUXq/XCgQCet/pf4JPul4n0f0JvY8eXU99ibsAAAAASUVORK5CYII=");
            done();
        });
    });

    it("can convert an point svg picture symbol to style", function (done) {
        var converter = new EsriSymbolToStyleConverter();
        converter.convert(APPLE_SYMBOL_SVG).then(function (style) {
            expect(style).toBeDefined();
            expect(style.icon).toBeDefined();
            expect(style.icon.scaledSize).toBeDefined();
            expect(style.icon.anchor).toBeDefined();
            expect(style.icon.size).toBeDefined();
            expect(style.icon.scaledSize.width).toBe(15);
            expect(style.icon.size.width).toBe(30);
            expect(style.icon.symbol).toBeDefined("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjEwMDAiCiAgIHZpZXdCb3g9IjAgMCAxMDAwIDExODcuMTk4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGhlaWdodD0iMTE4Ny4xOTgiCiAgIGlkPSJzdmcyIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iQXBwbGVfMTk5OC5zdmciPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTEwIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZGVmcwogICAgIGlkPSJkZWZzOCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzNjYiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNzA1IgogICAgIGlkPSJuYW1lZHZpZXc2IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjE3Njc3NjciCiAgICAgaW5rc2NhcGU6Y3g9Ii0xMDY2LjUwNDUiCiAgICAgaW5rc2NhcGU6Y3k9Ijk2NC45NDY2OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMiIgLz4KICA8cGF0aAogICAgIGQ9Im0gOTc5LjA0MTg0LDkyNS4xODc4NSBjIC0xNy45NTM5Nyw0MS40NzczNyAtMzkuMjA1NjMsNzkuNjU3MDUgLTYzLjgyODI0LDExNC43NTg5NSAtMzMuNTYyOTgsNDcuODUyOCAtNjEuMDQzNTYsODAuOTc2MSAtODIuMjIxOTQsOTkuMzY5OCAtMzIuODMwMTMsMzAuMTkyIC02OC4wMDUyOSw0NS42NTQ0IC0xMDUuNjcyMDMsNDYuNTMzOCAtMjcuMDQwODksMCAtNTkuNjUxMiwtNy42OTQ2IC05Ny42MTEwNSwtMjMuMzAzNSAtMzguMDg0NDIsLTE1LjUzNTggLTczLjA4MzcxLC0yMy4yMzAzIC0xMDUuMDg1NzgsLTIzLjIzMDMgLTMzLjU2Mjk2LDAgLTY5LjU1ODg4LDcuNjk0NSAtMTA4LjA2MTAxLDIzLjIzMDMgLTM4LjU2MDgsMTUuNjA4OSAtNjkuNjI0ODQsMjMuNzQzMiAtOTMuMzc1NDEsMjQuNTQ5MyAtMzYuMTIwNDksMS41Mzg5IC03Mi4xMjM3LC0xNC4zNjMyIC0xMDguMDYxMDEsLTQ3Ljc3OTYgLTIyLjkzNzExLC0yMC4wMDU5IC01MS42MjY4NCwtNTQuMzAxNyAtODUuOTk1OTIsLTEwMi44ODc0IEMgOTIuMjU0MTc2LDk4NC41NDU5MiA2MS45Mzc1ODgsOTI0LjM4MTc1IDM4LjE4NzAyOCw4NTUuNzkwMiAxMi43NTA5OTUsNzgxLjcwMjUyIDAsNzA5Ljk1OTg2IDAsNjQwLjUwMzYxIDAsNTYwLjk0MTgxIDE3LjE5MTg1OSw0OTIuMzIwOTQgNTEuNjI2ODY5LDQzNC44MTY4OCA3OC42ODk3NTQsMzg4LjYyNzUzIDExNC42OTI5OSwzNTIuMTkxOTIgMTU5Ljc1MzgxLDMyNS40NDQxMyBjIDQ1LjA2MDg2LC0yNi43NDc3NSA5My43NDkxNCwtNDAuMzc4MTIgMTQ2LjE4MjEyLC00MS4yNTAxOSAyOC42ODk3MSwwIDY2LjMxMjUsOC44NzQ0IDExMy4wNjYxMywyNi4zMTU0MiA0Ni42MjE3NCwxNy40OTk2NCA3Ni41NTcyNywyNi4zNzQwNCA4OS42ODE5OCwyNi4zNzQwNCA5LjgxMjQsMCA0My4wNjc1OCwtMTAuMzc2NjkgOTkuNDQzMSwtMzEuMDY0MDUgNTMuMzEyMzcsLTE5LjE4NTEyIDk4LjMwNzI0LC0yNy4xMjg4NyAxMzUuMTY3ODcsLTIzLjk5OTc1IDk5Ljg4MjgsOC4wNjA5OCAxNzQuOTIzMTMsNDcuNDM1MTggMjI0LjgyNzg5LDExOC4zNzE3NCAtODkuMzMwMjMsNTQuMTI1NzggLTEzMy41MTkwMywxMjkuOTM1NTYgLTEzMi42Mzk2NiwyMjcuMTg3NTMgMC44MDYxLDc1Ljc1MTE1IDI4LjI4NjY4LDEzOC43ODc5NSA4Mi4yOTUyLDE4OC44MzkzIDI0LjQ3NjAzLDIzLjIzMDIyIDUxLjgxMDA4LDQxLjE4NDIxIDgyLjIyMTg2LDUzLjkzNTIyIC02LjU5NTI1LDE5LjEyNjQ4IC0xMy41NTcsMzcuNDQ2ODggLTIwLjk1ODQ2LDU1LjAzNDQ2IHogTSA3NDkuOTYzNjYsMjMuNzUxMjM3IGMgMCw1OS4zNzM0MyAtMjEuNjkxMzgsMTE0LjgxMDIzMyAtNjQuOTI3NDgsMTY2LjEyMTk2MyAtNTIuMTc2NTIsNjAuOTk5NjEgLTExNS4yODY1OCw5Ni4yNDgwMyAtMTgzLjcyNDI2LDkwLjY4NTk3IC0wLjg3MjA0LC03LjEyMjk4IC0xLjM3NzY5LC0xNC42MTk2NyAtMS4zNzc2OSwtMjIuNDk3NDMgMCwtNTYuOTk4NDMgMjQuODEzMTUsLTExNy45OTgwMSA2OC44NzczOCwtMTY3Ljg3MzQ1MyAyMS45OTkwOSwtMjUuMjUyODEgNDkuOTc4LC00Ni4yNTAxOCA4My45MDczOCwtNjMuMDAwMTggQyA2ODYuNTc1MDcsMTAuNjg4MDI3IDcxOC41OTkxMywxLjU2MzEyNzQgNzQ4LjcxNzgzLDUuMjczNDM3NmUtNCA3NDkuNTk3MjcsNy45Mzc4Mjc0IDc0OS45NjM2NiwxNS44NzU2MjcgNzQ5Ljk2MzY2LDIzLjc1MDQ2NyBaIgogICAgIGlkPSJwYXRoNCIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgo8L3N2Zz4K");
            done();
        });
    });

    it("can convert an point jpeg picture symbol to style", function (done) {
        var converter = new EsriSymbolToStyleConverter();
        converter.convert(SIMPLE_SYMBOL_JPEG).then(function (style) {
            expect(style).toBeDefined();
            expect(style.icon).toBeDefined();
            expect(style.icon.scaledSize).toBeDefined();
            expect(style.icon.anchor).toBeDefined();
            expect(style.icon.size).toBeDefined();
            expect(style.icon.scaledSize.width).toBe(36);
            expect(style.icon.size.width).toBe(72);
            expect(style.icon.symbol).toBeDefined("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCkRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgE7AAIAAAAYAAAAWodpAAQAAAABAAAAcgAAAAAAAABIAAAAAQAAAEgAAAABVmVjdG9yU3RvY2suY29tLzgyNTI5MDgAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAACSgAwAEAAAAAQAAACQAAAAA/+EJuGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPiA8ZGM6Y3JlYXRvcj4gPHJkZjpTZXE+IDxyZGY6bGk+VmVjdG9yU3RvY2suY29tLzgyNTI5MDg8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L2RjOmNyZWF0b3I+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz4A/+0AZFBob3Rvc2hvcCAzLjAAOEJJTQQE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");
            done();
        });
    });

    it("can convert a point circle symbol to style", function (done) {
        var converter = new EsriSymbolToStyleConverter();
        converter.convert(CIRCLE_SYMBOL).then(function (style) {
            expect(style).toBeDefined();
            expect(style.icon).toBeDefined();
            expect(style.icon.anchor).toBeDefined();
            expect(style.icon.size).toBeDefined();
            expect(style.icon.size.width).toBeDefined(5);
            // expect(style.icon.symbol).toBeDefined("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEWElEQVRIS5WUy28bVRTG79zxHc9cx3HGHmcSp3GqNkAxIRHgNA8aYYtFFwghsahYsGKFhBT+Be+y8KoSC6RKqLtsUBaVKqurOqQ0JUqqisrGmKImJDhubZyx5+E7nhe6Qw2lgjQ5m9FI3/mdT+ecexjw8mAAAAgAEHwmNQEAFgDAOy6VJj0f9B/m83n+zJkzkXg8PhAOhwXXdflut8tT4eDgIIEQEkVRiK7rWrlc7hQKhW6xWHSeL/YimKXucrlcIpVKTYmieD4ajY5gjIeCwaDgeR5j2zYhhHKVuqIojyuVSunGjRs1hBCF232XfTD9MisrK9TlWCKRuBCLxWZDodBrGOMRjuOGEEJBhmGAZVm9Xq/XJoQ8MQzjl2azuXN4eFjpdDq/ra2tHfWd98GQOr1+/frk+Ph4VpKki6OjoymM8SjDMDyEEEEIqQZ4nue6rmu5rmsSQurNZrPabDa3Hz16dPvatWvVvnMfnM/nQ7Ztx9Pp9NsjIyMfiaI4K0nSWDAYHDxuQKZpau12+1BRlPt7e3s3S6XSNsuyvy8vL3d88OrqagIh9M7Zs2ffnZiYeD8cDr+KEBKo0+PAruvalmXRIf66t7e3Ua/X77Ase/fy5cv7Pnh9ff0V13U/kGU5k0wmaW8TL9/CfxSGYTw5ODh42Gq1igCAtYWFhZ988M7OzjSE8NNIJJKRZfk8xjh6GjAhpNNoNA40TSvatv3N9PT0fR9cqVTSrut+PjAwkInH4zLP8wOnAZumSffvSNO07xRF+SqdTm/54Gq1OgcAWBYEISNJksjzvHAacK/Xs1RV1TVNu7O/v391aWnpBx9cLpfnWZb9EmNMwUM8z/uv7KRBwZ1Op2sYxgYFX7p06Z4PLpVKFyGEX9BWxGIxSRAEfFIo1ZmmaR4dHamGYaxrmnZ1ZmbmL8cPHjx4CwDwWSQSeW94eDiJMY6cBkwI0RqNxhNVVdc9z/t6ampq2wdvbm6+7rrux5IkZcbGxt7EGMv0+Z40dF3/o1arVRVFoVuxuri4+NDPvnXr1jiEcEGW5aVEIpHBGE9yHIdYlqVH6X/DcRzXsizLMIzdWq129+nTpxsQwtvZbHa3Dw6xLCtHo9E5jPEnoVBoNhaL0e3gj3NOCKG97ei6fr/dbn9br9fvGYaxf+XKlbYPzuVyMJVKBZLJ5AWGYT6MRCJzkiRN8jw/DCGkG8IBANhnRRzP8yzP8+j5bLZarceqqm7pun6zWq2Wz507181ms/bfZzOXyzHz8/NDoiiOI4SmeZ5fQgi9gRBKsCwr0gIU7Hme6TiOYllW3bbtMiHke13Xf1RVdZfjuFYmk3EYhvH+NSHP82ChUEChUCgJIZznef4CxjjBcZzIsixPD73jOKZt20q32z00TfNn0zS3Go3GbjweJ9RpfyAvgv2DXywWMcdxMY7jwoIgCIFAgOM4Dtq2zUAIHdM0LdoHTdPUXq/XCgQCet/pf4JPul4n0f0JvY8eXU99ibsAAAAASUVORK5CYII=");
            done();
        });
    });

    it("can convert a point diamond symbol to style", function (done) {
        var converter = new EsriSymbolToStyleConverter();
        converter.convert(DIAMOND_SYMBOL).then(function (style) {
            expect(style).toBeDefined();
            expect(style.icon).toBeDefined();
            expect(style.icon.anchor).toBeDefined();
            expect(style.icon.size).toBeDefined();
            expect(style.icon.size.width).toBeDefined(13);

            // expect(style.icon.symbol).toBeDefined("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEWElEQVRIS5WUy28bVRTG79zxHc9cx3HGHmcSp3GqNkAxIRHgNA8aYYtFFwghsahYsGKFhBT+Be+y8KoSC6RKqLtsUBaVKqurOqQ0JUqqisrGmKImJDhubZyx5+E7nhe6Qw2lgjQ5m9FI3/mdT+ecexjw8mAAAAgAEHwmNQEAFgDAOy6VJj0f9B/m83n+zJkzkXg8PhAOhwXXdflut8tT4eDgIIEQEkVRiK7rWrlc7hQKhW6xWHSeL/YimKXucrlcIpVKTYmieD4ajY5gjIeCwaDgeR5j2zYhhHKVuqIojyuVSunGjRs1hBCF232XfTD9MisrK9TlWCKRuBCLxWZDodBrGOMRjuOGEEJBhmGAZVm9Xq/XJoQ8MQzjl2azuXN4eFjpdDq/ra2tHfWd98GQOr1+/frk+Ph4VpKki6OjoymM8SjDMDyEEEEIqQZ4nue6rmu5rmsSQurNZrPabDa3Hz16dPvatWvVvnMfnM/nQ7Ztx9Pp9NsjIyMfiaI4K0nSWDAYHDxuQKZpau12+1BRlPt7e3s3S6XSNsuyvy8vL3d88OrqagIh9M7Zs2ffnZiYeD8cDr+KEBKo0+PAruvalmXRIf66t7e3Ua/X77Ase/fy5cv7Pnh9ff0V13U/kGU5k0wmaW8TL9/CfxSGYTw5ODh42Gq1igCAtYWFhZ988M7OzjSE8NNIJJKRZfk8xjh6GjAhpNNoNA40TSvatv3N9PT0fR9cqVTSrut+PjAwkInH4zLP8wOnAZumSffvSNO07xRF+SqdTm/54Gq1OgcAWBYEISNJksjzvHAacK/Xs1RV1TVNu7O/v391aWnpBx9cLpfnWZb9EmNMwUM8z/uv7KRBwZ1Op2sYxgYFX7p06Z4PLpVKFyGEX9BWxGIxSRAEfFIo1ZmmaR4dHamGYaxrmnZ1ZmbmL8cPHjx4CwDwWSQSeW94eDiJMY6cBkwI0RqNxhNVVdc9z/t6ampq2wdvbm6+7rrux5IkZcbGxt7EGMv0+Z40dF3/o1arVRVFoVuxuri4+NDPvnXr1jiEcEGW5aVEIpHBGE9yHIdYlqVH6X/DcRzXsizLMIzdWq129+nTpxsQwtvZbHa3Dw6xLCtHo9E5jPEnoVBoNhaL0e3gj3NOCKG97ei6fr/dbn9br9fvGYaxf+XKlbYPzuVyMJVKBZLJ5AWGYT6MRCJzkiRN8jw/DCGkG8IBANhnRRzP8yzP8+j5bLZarceqqm7pun6zWq2Wz507181ms/bfZzOXyzHz8/NDoiiOI4SmeZ5fQgi9gRBKsCwr0gIU7Hme6TiOYllW3bbtMiHke13Xf1RVdZfjuFYmk3EYhvH+NSHP82ChUEChUCgJIZznef4CxjjBcZzIsixPD73jOKZt20q32z00TfNn0zS3Go3GbjweJ9RpfyAvgv2DXywWMcdxMY7jwoIgCIFAgOM4Dtq2zUAIHdM0LdoHTdPUXq/XCgQCet/pf4JPul4n0f0JvY8eXU99ibsAAAAASUVORK5CYII=");
            done();
        });
    });

    it("can convert a point square symbol to style", function (done) {
        var converter = new EsriSymbolToStyleConverter();
        converter.convert(SQUARE_SYMBOL).then(function (style) {
            expect(style).toBeDefined();
            expect(style.icon).toBeDefined();
            expect(style.icon.anchor).toBeDefined();
            expect(style.icon.size).toBeDefined();
            expect(style.icon.size.width).toBeDefined(12);
            // expect(style.icon.symbol).toBeDefined("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAEWElEQVRIS5WUy28bVRTG79zxHc9cx3HGHmcSp3GqNkAxIRHgNA8aYYtFFwghsahYsGKFhBT+Be+y8KoSC6RKqLtsUBaVKqurOqQ0JUqqisrGmKImJDhubZyx5+E7nhe6Qw2lgjQ5m9FI3/mdT+ecexjw8mAAAAgAEHwmNQEAFgDAOy6VJj0f9B/m83n+zJkzkXg8PhAOhwXXdflut8tT4eDgIIEQEkVRiK7rWrlc7hQKhW6xWHSeL/YimKXucrlcIpVKTYmieD4ajY5gjIeCwaDgeR5j2zYhhHKVuqIojyuVSunGjRs1hBCF232XfTD9MisrK9TlWCKRuBCLxWZDodBrGOMRjuOGEEJBhmGAZVm9Xq/XJoQ8MQzjl2azuXN4eFjpdDq/ra2tHfWd98GQOr1+/frk+Ph4VpKki6OjoymM8SjDMDyEEEEIqQZ4nue6rmu5rmsSQurNZrPabDa3Hz16dPvatWvVvnMfnM/nQ7Ztx9Pp9NsjIyMfiaI4K0nSWDAYHDxuQKZpau12+1BRlPt7e3s3S6XSNsuyvy8vL3d88OrqagIh9M7Zs2ffnZiYeD8cDr+KEBKo0+PAruvalmXRIf66t7e3Ua/X77Ase/fy5cv7Pnh9ff0V13U/kGU5k0wmaW8TL9/CfxSGYTw5ODh42Gq1igCAtYWFhZ988M7OzjSE8NNIJJKRZfk8xjh6GjAhpNNoNA40TSvatv3N9PT0fR9cqVTSrut+PjAwkInH4zLP8wOnAZumSffvSNO07xRF+SqdTm/54Gq1OgcAWBYEISNJksjzvHAacK/Xs1RV1TVNu7O/v391aWnpBx9cLpfnWZb9EmNMwUM8z/uv7KRBwZ1Op2sYxgYFX7p06Z4PLpVKFyGEX9BWxGIxSRAEfFIo1ZmmaR4dHamGYaxrmnZ1ZmbmL8cPHjx4CwDwWSQSeW94eDiJMY6cBkwI0RqNxhNVVdc9z/t6ampq2wdvbm6+7rrux5IkZcbGxt7EGMv0+Z40dF3/o1arVRVFoVuxuri4+NDPvnXr1jiEcEGW5aVEIpHBGE9yHIdYlqVH6X/DcRzXsizLMIzdWq129+nTpxsQwtvZbHa3Dw6xLCtHo9E5jPEnoVBoNhaL0e3gj3NOCKG97ei6fr/dbn9br9fvGYaxf+XKlbYPzuVyMJVKBZLJ5AWGYT6MRCJzkiRN8jw/DCGkG8IBANhnRRzP8yzP8+j5bLZarceqqm7pun6zWq2Wz507181ms/bfZzOXyzHz8/NDoiiOI4SmeZ5fQgi9gRBKsCwr0gIU7Hme6TiOYllW3bbtMiHke13Xf1RVdZfjuFYmk3EYhvH+NSHP82ChUEChUCgJIZznef4CxjjBcZzIsixPD73jOKZt20q32z00TfNn0zS3Go3GbjweJ9RpfyAvgv2DXywWMcdxMY7jwoIgCIFAgOM4Dtq2zUAIHdM0LdoHTdPUXq/XCgQCet/pf4JPul4n0f0JvY8eXU99ibsAAAAASUVORK5CYII=");
            done();
        });
    });

    it("can convert a line symbol to style", function (done) {
        var converter = new EsriSymbolToStyleConverter();
        converter.convert(POLYLINE_SYMBOL).then(function (style) {
            expect(style).toBeDefined();
            expect(style.strokeColor).toBe("rgba(255,0,0,1)");
            expect(style.strokeOpacity).toBe(1.0);
            expect(style.strokeWeight).toBe(2);
            done();
        });
    });

    it("can convert a polygon symbol to style", function (done) {
        var converter = new EsriSymbolToStyleConverter();
        converter.convert(POLYGON_SYMBOL).then(function (style) {
            expect(style).toBeDefined();
            expect(style.fillColor).toBe("rgba(255,102,51,1)");
            expect(style.fillOpacity).toBe(1.0);
            expect(style.strokeColor).toBe("rgba(0,0,0,0)");
            expect(style.strokeOpacity).toBe(0);
            expect(style.strokeWeight).toBe(1);
            done();
        });
    });

});
