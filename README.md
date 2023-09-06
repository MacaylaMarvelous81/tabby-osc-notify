# osc-notify

This is a [Tabby](https://github.com/Eugeny/tabby) plugin. It creates a system
notification when an OSC 9 escape code sequence is printed. OSC 9 is in this
format:

```sh
OSC 9 ; [message] ST
```

### Example commands

```sh
# creates a notification that says 'hello'
printf "\033]9;hello\a"
# for tmux, use the passthrough escape sequence. allow-passthrough should be
# enabled
printf "\033Ptmux;\033\x1b]9;hello\x07\033\\"
```
