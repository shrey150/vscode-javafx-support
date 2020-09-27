# JavaFX Support for VSCode

![Marketplace Version](https://vsmarketplacebadge.apphb.com/version/shrey150.javafx-support.svg)

Fixes "Language Support for Java(TM) by Red Hat" when using JavaFX.

In Java 8, JavaFX is bundled along with the JDK. However, the official Java Extension Pack does not account for this, causing persistent warnings and interfering with IntelliSense:

![Example of JavaFX problems in VSCode](https://i.imgur.com/BNhZ6gl.png)

This issue is caused by the Eclipse Language Server (JDT) that Red Hat's Java extension depends on for code completion and API documentation. One such file used by JDT is `.classpath`, which contains info necessary for project compilation, such as source folders, dependencies, and output paths. Red Hat's extension does not properly account for the bundled JavaFX API, which can be solved by adding an access rule into `.classpath` as shown below:

```xml
<classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER/org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType/JavaSE-1.8/">
    <accessrules>
        <accessrule kind="accessible" pattern="javafx/**"/>
        <accessrule kind="accessible" pattern="com/sun/javafx/**"/>
    </accessrules>
</classpathentry>
```

However, if this is added manually, Red Hat's extension will periodically revert this to their generated `.classpath` configuration. This happens when checking out a new Git branch, updating `pom.xml`, or if the project configuration needs to be updated for any reason.

To solve this inconvenience, `javafx-support` automatically detects changes in your project configuration and adds the above `<classpathentry>` whenever necessary.
