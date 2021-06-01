import { Arguments, Command, getNames } from '@smoothjs/cli'
import { basename, join } from 'path'
import * as fs from 'fs'
import { cyan, green } from 'colors/safe'

export class ValidatorCommand {
  @Command({
    name: 'make:request <name>',
    description: 'Create a new HTTP body validator.',
    arguments: {
      name: 'Validator class name.',
    },
  })
  async validator(
    @Arguments()
    args: string[]
  ) {
    const [name] = args

    let root = ''
    if (fs.existsSync('app/validators')) {
      root = 'app/validators'
    } else if (fs.existsSync('validators')) {
      root = 'validators'
    }

    const names = getNames(basename(name))

    const fileName = `${names.kebabName}.validator.ts`

    let content = fs.readFileSync(join(__dirname, 'templates', 'validator.empty.ts'), 'utf8')
    for (const key in names) {
      content = content.split(`/* ${key} */`).join(names[key])
    }
    fs.writeFileSync(join(root, fileName), content, 'utf8')

    console.log(`${green('CREATE')} ${join(root, fileName)}`)
  }
}
