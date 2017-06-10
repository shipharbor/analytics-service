# analytics-service
Lil analytics service.

## Making DDOS slightly harder
Generally analytics logs aren't particularly sensitive to write to - at worst
there'll be skewed data which can be filtered in post-processing. To make it
slightly harder though, it's recommended to add at least a little hurdle. An
example approach of this would be to include a `set-cookie` directive on the
first request to the site (e.g. `index.html`). This would include something
like an encrypted timestamp that can only be decoded by the service. By
checking that the timestamp was recent, a lot of trivial DDOSsing and
accidental write scenarios would be mitigated. This doesn't prevent any
directed attacks, for which more elaborate methods such as IP banning (e.g.
`fail2ban` and the like should be deployed).

## See Also
- [yoshuawuyts/microanalytics](https://github.com/yoshuawuyts/microanalytics)

## License
[MIT](https://tldrlegal.com/license/mit-license)
