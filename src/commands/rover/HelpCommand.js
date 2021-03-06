const Command = require('../Command')

module.exports =
class HelpCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'roverhelp',
      aliases: ['rover'],
      description: 'Displays a list of commands'
    })
  }

  async fn (msg) {
    let commandGroup = this.client.registry.groups.get('rover')
    let lines = commandGroup.commands.map(cmd => `**${msg.guild.commandPrefix}${cmd.name}:** ${cmd.description}`).join('\n\n').split('\n')
    let output = ''
    for (let line of lines) {
      if (output.length + line.length > 1900) {
        msg.reply(output)
        output = ''
      }

      output += line + '\n'
    }

    msg.reply(output)
  }
}
