/**
 * Object representing `<classpathentry>`.
 */
interface ClassPathEntry {
    $: {
        kind: string,
        output?: string,
        excluding?: string
        path: string
    },

    attributes: Array<Attribute>
    accessrules?: [{
        accessrule: Array<AccessRule>
    }]
}

/**
 * Object representing `<attribute>`.
 */
interface Attribute {
    $: {
        name: string,
        value: string
    }
}

/**
 * Object representing `<accessrule>`.
 */
interface AccessRule {
    $: { 
        kind: string,
        pattern: string
    }
}